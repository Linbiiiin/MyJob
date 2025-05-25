import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

import globalStyles from '../../contants/globalStyles';
import Icon from '../../components/Icon';
import AdeptSafeViewArea from '../../components/AdeptSafeViewArea';
import globalRouter from '../../contants/globalRouter';

const services = [
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
  {
    name: '服务模块',
    icon: '',
  },
];

const Mine = (props) => {
  const { navigation } = props;
  const onLinkLogin = useCallback(() => {
    navigation.reset({
      index: 0, // 重置堆栈为 0
      routes: [{ name: globalRouter.login }], // 设置新的首页为 Home
    });
  }, [navigation]);

  return (
    <AdeptSafeViewArea includesDirect={['top']}>
      <ScrollView style={styles.mine} contentContainerStyle={styles.scrollContent}>
        <View style={styles.operatorBlock}>
          <Icon name="service" size={18} color="#000" />
          <View style={styles.operatorIconSpace}></View>
          <Icon name="set"  size={18} color="#000" />
        </View>
        <View style={styles.loginBlock}>
          <View style={styles.avatar} />
          <Pressable onPress={onLinkLogin}>
            <Text style={styles.loginText}>登录/注册</Text>
          </Pressable>
        </View>
        <View style={styles.statBlock}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statName}>全部报名</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statName}>待录取</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statName}>已录取</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statName}>已结束</Text>
          </View>
        </View>
        <View style={styles.banner}>
          <Swiper
            autoplayTimeout={3}
            autoplay
            loop
            showsPagination={false}
          >
            <View style={styles.slideItem}>
              <Text style={styles.text}>Slide 1</Text>
            </View>
            <View style={styles.slideItem}>
              <Text style={styles.text}>Slide 2</Text>
            </View>
            <View style={styles.slideItem}>
              <Text style={styles.text}>Slide 3</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.service}>
          <Text style={styles.serviceTitle}>更多服务</Text>
          <View style={styles.serviceScope}>
            {
              services.map((item, index) => {
                const { name } = item;

                return (
                  <View key={`service-${index}`} style={styles.serviceItem}>
                    <View style={styles.serviceIcon} />
                    <Text style={styles.serviceName}>{name}</Text>
                  </View>
                );
              })
            }
          </View>
        </View>
        <View style={styles.statement} />
      </ScrollView>
    </AdeptSafeViewArea>
  );
};

const styles = StyleSheet.create({
  mine: {
    flex: 1,
  },
  scrollContent: {
    padding: globalStyles.space.sm,
  },
  operatorBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  operatorIconSpace: {
    width: 25,
  },
  loginBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: globalStyles.space.normal,
    borderRadius: 30,
    backgroundColor: '#000',
  },
  loginText: {
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.main,
  },
  statBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  statItem: {
    alignItems: 'center',
    width: '25%',
  },
  statValue: {
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s18,
    color: globalStyles.color.main,
  },
  statName: {
    marginTop: globalStyles.space.sm,
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.sub,
  },
  banner: {
    width: '100%',
    height: 80,
    marginTop: globalStyles.space.sm,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  slideItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {},
  service: {
    marginTop: globalStyles.space.sm,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  serviceTitle: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s14,
    color: globalStyles.color.main,
  },
  serviceScope: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    padding: 10,
  },
  serviceIcon: {
    width: 14,
    height: 14,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  serviceName: {
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.sub,
  },
  statement: {},
});

export default Mine;
