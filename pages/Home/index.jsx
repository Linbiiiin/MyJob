import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../contants/globalStyles';
import { useHome } from './hooks';
import AdeptSafeViewArea from '../../components/AdeptSafeViewArea';
import globalRouter from '../../contants/globalRouter';


function Home() {
  const { fastList } = useHome();
  const navigation = useNavigation();
  const PartTimeJobCard = useCallback((row) => {
    const { item } = row;
    const {
      id,
      title,
      hourlyWage,
      currency,
      timeUnit,
      companyName,
      tags,
      verified,
      distance,
      location,
    } = item;
    const onLinkInformation = () => {
      navigation.navigate(globalRouter.part_time_information, { partTimeId: id });
    };

    return (
      <Pressable onPress={onLinkInformation} style={styles.partTimeJobCard} key={`row-${id}`}>
        <View style={styles.jobCardHead}>
          <Text numberOfLines={1} style={styles.jobCardTitle}>{title}</Text>
          <View style={styles.jobCardMoney}>
            <Text style={styles.jobCardPrice}>{hourlyWage}{currency}</Text>
            <Text style={styles.jobCardUnit}>/{timeUnit}</Text>
          </View>
        </View>
        {
          tags.length > 0 && (
            <View style={styles.jobCardTags}>
              {tags?.map((tag, index) => {
                return (
                  <View style={styles.tagBox} key={`tag-${index}`}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                );
              })}
            </View>
          )
        }
        <View style={styles.jobCardFooter}>
          <View style={styles.companyAvatar} />
          <View styles={styles.companyInfo}>
            <View style={styles.companyAuth}>
              <Text style={styles.companyName}>{companyName}</Text>
            </View>
            <View style={styles.companyPos}>
              <Text style={styles.companyDistance}>{distance}</Text>
              <Text style={styles.companyAddress}>{location}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }, [navigation]);

  const FastListKey = useCallback(item => item.id, []);
  const ListFooterComponent = useCallback(() => {
    if (fastList.loading) {
      return (
        <View style={styles.listLoadingStyle}>
          <ActivityIndicator size="small" color="#00baff" />
          <Text style={styles.loadingText}>加载中</Text>
        </View>
      );
    }

    if (!fastList.loading && !fastList.hasMore && fastList.list.length > 0) {
      return <Text style={styles.noMore}>到底了</Text>;
    }

    if (!fastList.loading && !fastList.hasMore && fastList.list.length === 0) {
      return <Text style={styles.noData}>暂无数据</Text>;
    }

    return null;
  }, [fastList.loading, fastList.hasMore]);
  const ListRefreshComponent = useMemo(() => {
    return (<RefreshControl color="#00baff" refreshing={fastList.refreshing} onRefresh={fastList.api.refresh} />);
  }, [fastList.refreshing]);

  return (
    <AdeptSafeViewArea includesDirect={['top']}>
      <View style={styles.container}>
        <View style={styles.jobSearch}>
          <View style={styles.pos}>
            <Text>定位</Text>
          </View>
          <View style={styles.search}>
            <Text>查询</Text>
          </View>
        </View>
        <View style={styles.jobContainer}>
          <FlatList
            data={fastList.list}
            initialNumToRender={fastList.page.linesPerPage}
            maxToRenderPerBatch={fastList.page.linesPerPage}
            renderItem={PartTimeJobCard}
            keyExtractor={FastListKey}
            onEndReached={fastList.api.more}
            onEndReachedThreshold={0.3} // 提前触发加载的距离
            ListFooterComponent = {ListFooterComponent}
            refreshControl={ListRefreshComponent}
          />
        </View>
      </View>
    </AdeptSafeViewArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'red'
  },
  jobSearch: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: globalStyles.space.sm,
  },
  pos: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: '100%',
  },
  search: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  jobContainer: {
    flex: 1,
  },
  partTimeJobCard: {
    padding: 12,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: globalStyles.radius.sm,
    backgroundColor: '#fff',
  },
  jobCardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobCardTitle: {
    flex: 1,
    marginRight: globalStyles.space.sm,
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.main,
  },
  jobCardMoney: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  jobCardPrice: {
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.red,
  },
  jobCardUnit: {
    marginBottom: 2,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.red,
  },
  jobCardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: globalStyles.space.sm,
  },
  tagBox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 4,
    borderRadius: 2,
    backgroundColor: '#ececec',
  },
  tagText: {
    fontSize: globalStyles.fontSize.s10,
    color: '#888',
  },
  jobCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: globalStyles.space.sm,
  },
  companyAvatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: globalStyles.radius.normal,
    backgroundColor: '#00baff',
  },
  companyInfo: {
    justifyContent: 'flex-start',
  },
  companyAuth: {
    flexDirection: 'row',
  },
  companyName: {
    marginBottom: 4,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.main,
  },
  companyPos: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  companyDistance: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  companyAddress: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  noMore: {
    marginVertical: 15,
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
    textAlign: 'center',
  },
  noData: {
    marginVertical: 15,
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
    textAlign: 'center',
  },
  listLoadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
});

export default Home;
