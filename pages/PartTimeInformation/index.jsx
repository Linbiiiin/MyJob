import React, { useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../contants/globalStyles';
import Icon from '../../components/Icon';
import globalRouter from '../../contants/globalRouter';




const PartTimeInformation = () => {
  const navigation = useNavigation();
  const onLinkCompanyInfo = useCallback(() => {
    navigation.navigate(globalRouter.company_info, { companyId: '' });
  }, [navigation]);

  return (
    <ScrollView style={styles.partTimeInformation} contentContainerStyle={styles.scrollContent}>
      <View style={styles.blockContainer}>
        <Text style={styles.workName}>周末兼职服务员</Text>
        <Text style={styles.payInfo}>17元/小时</Text>
        <View style={styles.tags}>
          <View style={styles.tagBox}>
            <Text style={styles.tagText}>无需经验</Text>
          </View>
          <View style={styles.tagBox}>
            <Text style={styles.tagText}>时间自由</Text>
          </View>
          <View style={styles.tagBox}>
            <Text style={styles.tagText}>快速入职</Text>
          </View>
          <View style={styles.tagBox}>
            <Text style={styles.tagText}>性别不限</Text>
          </View>
          <View style={styles.tagBox}>
            <Text style={styles.tagText}>学历不限</Text>
          </View>
        </View>
        <Text style={styles.reportNum}>已有0人报名</Text>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.workFeature}>
          <View style={styles.featureTitle}>
            <View style={styles.featureIcon} />
            <Text style={styles.featureName}>线上职位</Text>
          </View>
          <Text style={styles.featureDesc}>不限工作时间地点</Text>
        </View>
        <View style={styles.space} />
        <View style={styles.workFeature}>
          <View style={styles.featureTitle}>
            <View style={styles.featureIcon} />
            <Text style={styles.featureName}>职位要求</Text>
          </View>
          <Text style={styles.featureDesc}>不限性别｜限18岁以上50岁以下</Text>
        </View>
      </View>
      <Text style={styles.blockTitle}>
        职位详情
      </Text>
      <View style={styles.blockContainer}>
        <Text>
          {`【职位要求】\n\n我们正在寻找勤劳、热情的服务员加入我们的团队，提供优质的用餐服务！无论你是学生党，还是寻找灵活时间的兼职机会，我们都欢迎你的加入！
          \n\n【工作内容】\n\n1.接待顾客，安排座位并提供菜单。\n2.记录点单，确保顾客的需求被准确传达至后厨。\n3.上菜、加水及清理桌面，保持餐厅环境整洁。\n4.处理简单顾客咨询，确保顾客用餐体验愉快。\n5.协助其他服务员完成团队协作任务。\n\n【工作时间】\n\n早上9:00 - 18:30\n\n【工作地点】\n\n交通便利，附近有地铁/公交站。
          `}
        </Text>
      </View>
      <Text style={styles.blockTitle}>
        发布企业
      </Text>
      <View style={styles.blockContainer}>
        <Pressable style={styles.company} onPress={onLinkCompanyInfo}>
          <View style={styles.companyAvatar} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>公司名称</Text>
            <Text style={styles.companyAuth}>企业认证</Text>
          </View>
          <Text style={styles.companyLink}>
            <Icon name="more" size={20} color="#888" />
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  partTimeInformation: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  blockTitle: {
    marginVertical: 8,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.main,
  },
  blockContainer: {
    padding: 16,
    marginBottom: globalStyles.space.sm,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  workName: {
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s18,
    color: globalStyles.color.main,
  },
  payInfo: {
    marginVertical: 6,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.red,
  },
  tags: {
    flexDirection: 'row',
  },
  tagBox: {
    flexWrap: 'wrap',
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ececec',
    borderStyle: 'solid',
  },
  tagText: {
    fontSize: globalStyles.fontSize.s10,
    color: '#888',
  },
  reportNum: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  workFeature: {},
  featureTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 20,
  },
  featureName: {
    marginBottom: 6,
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  featureDesc: {
    paddingLeft: 20,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.main,
  },
  space: {
    height: 16,
  },
  company: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: globalStyles.color.blue,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 6,
  },
  companyName: {
    marginBottom: 4,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.main,
  },
  companyAuth: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  companyLink: {
    width: 20,
    height: 20,
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.tip,
  },
});
export default PartTimeInformation;
