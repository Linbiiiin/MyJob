// 全局路由
// 路由映射将'/' 转化为 '_' 后即为映射名称，全局通过该映射名称来跳转路由，统一维护
export default {
  main: '/main', // 主页 -> 整个应用的首页
  home: '/home', // 首页 -> 主页下面的首页
  mine: '/mine', // 我的
  login: '/login', // 登录
  company_info: '/company/info', // 公司信息
  chat_window: '/chat/window', // 聊天页面
  square: '/square', // 兼职广场
  chat_message: '/chat/message', // 消息
  mine_curriculum_vitae: '/mine/curriculum/vitae', // 公司主页
  part_time_information: '/part/time/information', // 职位详情
};
