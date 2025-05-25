import {useCallback} from 'react';
import useFastList from '../../hooks/useFastList';

function generatePartTimeJobsData(count = 10) {
  const jobTitles = [
    '后厨兼职',
    '服务员',
    '收银员',
    '清洁员',
    '传菜员',
    '导购员',
    '促销员',
    '仓库管理员',
    '客户服务专员',
    '市场推广助理',
    '快递员',
    '理货员',
    '兼职导游',
    '数据录入员',
    '展会工作人员',
    '电话客服',
  ];

  const companyNames = [
    '汀州记（厦门）餐饮管理有限公司',
    '厦门小吃街美食城',
    '厦门环岛路旅游公司',
    '湖里区快递服务站',
    '鼓浪屿海鲜大排档',
    '厦门大润发超市',
    '厦门百货大楼',
    '厦门大学食堂后勤服务中心',
    '厦门华侨电子商城',
    '思明区服务外包有限公司',
    '厦门世茂广场商户',
    '湖里区物流配送公司',
    '厦门鼓浪屿旅游服务中心',
    '美食坊餐饮管理有限公司',
    '厦门城市快递公司',
  ];

  const locations = [
    '厦门市 思明区 世茂Emall',
    '厦门市 思明区 中山路',
    '厦门市 湖里区 禹州世贸商城',
    '厦门市 集美区 万达广场',
    '厦门市 海沧区 天虹商场',
    '厦门市 思明区 白鹭洲公园',
    '厦门市 湖里区 SM城市广场',
    '厦门市 思明区 厦门大学周边',
    '厦门市 集美区 华侨大学',
    '厦门市 海沧区 君尚天虹购物中心',
    '厦门市 思明区 鼓浪屿风景区',
    '厦门市 思明区 厦门火车站商圈',
    '厦门市 湖里区 五缘湾商业中心',
    '厦门市 同安区 祥平街道',
    '厦门市 思明区 曾厝垵',
    '厦门市 集美区 杏林湾',
    '厦门市 海沧区 新阳工业区',
    '厦门市 思明区 厦门软件园二期',
    '厦门市 集美区 厦门北站商圈',
    '厦门市 思明区 万象城购物中心',
  ];
  const tagOptions = [
    '高薪',
    '灵活时间',
    '周末兼职',
    '适合学生',
    '交通便利',
    '全职优先',
    '包餐',
    '临时工',
    '热门岗位',
    '适合新人',
  ];

  const jobData = [];

  for (let i = 0; i < count; i++) {   // 随机生成标签
    const tagCount = Math.floor(Math.random() * 3) + 2; // 随机标签数量，2到4个
    const tags = Array.from({ length: tagCount }, () => tagOptions[Math.floor(Math.random() * tagOptions.length)]);

    const job = {
      id:  new Date().getTime() + i + 1,
      title: `${jobTitles[Math.floor(Math.random() * jobTitles.length)]}，${jobTitles[Math.floor(Math.random() * jobTitles.length)]}，${Math.random() > 0.5 ? '厦门热门岗位' : '高薪兼职'}`,
      hourlyWage: `${(Math.random() * 4 + 18).toFixed(0)}-${(Math.random() * 2 + 20).toFixed(0)}`,
      currency: '元',
      timeUnit: '小时',
      companyName: companyNames[Math.floor(Math.random() * companyNames.length)],
      tags: [...new Set(tags)],
      verified: true,
      distance: `${(Math.random() * 5).toFixed(2)}公里`,
      location: locations[Math.floor(Math.random() * locations.length)],
    };

    jobData.push(job);
  }

  return jobData;
}

export const useHome = () => {

  const dataSource = useCallback(() => {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve({
          list: generatePartTimeJobsData(10),
          page: {
            totalNum: 10,
          },
        });
      }, 2000);
    });
  }, []);
  const fastList = useFastList({
    dataSource,
  });

  return {
    fastList,
  };
};
