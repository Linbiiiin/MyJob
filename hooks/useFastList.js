import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useLatest from './useLatest';

const useFastList = (props) => {
  const { dataSource, autoLoad = true } = props;
  const [list, setList] = useState([]); // 列表数据
  const [loading, setLoading] = useState(false); // 是否正在加载
  const [hasMore, setHasMore] = useState(false);  // 是否还有更多数据
  const [refreshing, setRefreshing] = useState(false);  // 刷新状态
  const [pageConfig, setPageConfig] = useState({
    currentPage: 1,
    linesPerPage: 10,
    totalNum: 0,
    totalPage: 0,
  }); // 分页数据
  const requestDataRef = useRef({});
  const autoLoadRef = useLatest(autoLoad);
  const dataSourceRef = useLatest(dataSource);
  const pageConfigRef = useLatest(pageConfig);
  const loadingRef = useLatest(loading);
  const hasMoreRef = useLatest(hasMore);
  const initListRef = useLatest(false);


  // 模拟获取数据的函数
  const fetchData = useCallback(async (body) => {
    setLoading(true);

    const {
      list: newList,
      page,
    } = await dataSourceRef.current(body);

    requestDataRef.current = body.data;
    if (!initListRef.current) {
      initListRef.current = true;
    }

    setList(pre => {
      const next = body.page.currentPage === 1 ? newList : [...pre, ...newList];

      setHasMore(preHasMore => next.length < page.totalNum);

      return next;
    });
    setPageConfig(pre => ({ ...pre, ...page }));
    setLoading(false);
    setRefreshing(false);
  }, []);


  // 加载更多数据
  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMoreRef.current) {
      setPageConfig((prevPage) => {
        const next = {
          ...prevPage,
          currentPage: prevPage.currentPage + 1,
        };

        fetchData({
          data: requestDataRef.current,
          page: next,
        });
        return next;
      });
    }
  }, [fetchData]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchData({
      data: requestDataRef.current,
      page: {
        ...pageConfigRef.current,
        currentPage: 1,
      },
    });
  }, [fetchData]);

  useEffect(() => {
    if (autoLoadRef.current) {
      fetchData({
        data: {
          ...(autoLoadRef.current?.requestData || {}),
        },
        page: {
          ...pageConfig,
          ...(autoLoadRef.current?.page || {}),
        },
      });
    }
  }, []);

  return useMemo(() => ({
    list: list,
    page: pageConfig,
    loading,
    hasMore,
    api: {
      more: loadMore,
      refresh,
    },
    init: initListRef.current,
    refreshing,
  }), [list, pageConfig, loading, loadMore, refresh, refreshing, hasMore]);

};

export default useFastList;
