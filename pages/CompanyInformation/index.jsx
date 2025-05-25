import React, { Fragment, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import globalStyles from '../../contants/globalStyles';
import Icon from '../../components/Icon';

import { useCustomStickLogic, screenWidth, sheetFixedHeight } from './hooks';


const CompanyInformation = () => {
  const {
    scrollRef,
    sheetRef,
    sheetStyle,
    onLayoutScroll,
    onLayoutSticky,
    handleContentSizeChange,
    snapPoints,
    stickyStyles,
  } = useCustomStickLogic();
  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.mockRow}>
        <Text>22222</Text>
      </View>
    ),
    []
  );

  return (
    <Fragment>
      <Animated.ScrollView
        style={styles.companyInfo}
        onContentSizeChange={handleContentSizeChange}
        onLayout={onLayoutScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <View style={styles.companyInfoContent}>
          <Text style={styles.companyName}>公司名称</Text>
          <Text style={styles.companyAuth}>
            <Icon name="auth" color="#000" />
            公司认证
          </Text>
          <Fragment>
            <Text style={styles.blockTitle}>
              服务保障
            </Text>
            <View style={styles.blockContainer}>
              <View style={styles.guarantee}>
                <View style={styles.guaranteeIcon} />
                <View style={styles.guaranteeInfo}>
                  <Text style={styles.guaranteeName}>闪电入职</Text>
                  <Text style={styles.guaranteeDesc}>报名后最快24小时上岗</Text>
                </View>
              </View>
              <View style={styles.guarantee}>
                <View style={styles.guaranteeIcon} />
                <View style={styles.guaranteeInfo}>
                  <Text style={styles.guaranteeName}>薪资日结</Text>
                  <Text style={styles.guaranteeDesc}>当天发薪，工资到账快人一步（部分岗位）</Text>
                </View>
              </View>
              <View style={styles.guarantee}>
                <View style={styles.guaranteeIcon} />
                <View style={styles.guaranteeInfo}>
                  <Text style={styles.guaranteeName}>免费保险</Text>
                  <Text style={styles.guaranteeDesc}>赠送最高10万元人身意外险</Text>
                </View>
              </View>
              <View style={styles.guarantee}>
                <View style={styles.guaranteeIcon} />
                <View style={styles.guaranteeInfo}>
                  <Text style={styles.guaranteeName}>内推奖励</Text>
                  <Text style={styles.guaranteeDesc}>推荐好友入职拿现金奖励</Text>
                </View>
              </View>
            </View>
          </Fragment>
          <Fragment>
            <Text style={styles.blockTitle}>
              企业基本信息
            </Text>
            <View style={styles.blockContainer}>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>经营状态</Text>
                <Text style={styles.companyValue}>经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态经营状态</Text>
              </View>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>成立日期</Text>
                <Text style={styles.companyValue}>成立日期</Text>
              </View>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>注册地址</Text>
                <Text style={styles.companyValue}>注册地址注册地址注册地址</Text>
              </View>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>统一信用代码</Text>
                <Text style={styles.companyValue}>统一信用代码统一信用代码</Text>
              </View>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>组织机构代码</Text>
                <Text style={styles.companyValue}>统一信用代码统一信用代码</Text>
              </View>
              <View style={styles.companyCondition}>
                <Text style={styles.companyLabel}>经营范围</Text>
                <Text style={styles.companyValue}>经营范围经营范围经营范围经营范围经营范围</Text>
              </View>
            </View>
          </Fragment>
          <View style={{ height: 600 }} />
          <View style={{ height: 2000 }} />
        </View>
        <Animated.View
          onLayout={onLayoutSticky}
          style={[styles.mockSheetBottom, stickyStyles]}
        >
          <View style={styles.sheetHeader}>
            <View style={styles.sheetHandler}>
              <View style={styles.handleBar} />
            </View>
            <Text style={styles.sheetHeaderTitle}>
              1111
            </Text>
          </View>
        </Animated.View>
        <View>
          {data.map(renderItem)}
        </View>
      </Animated.ScrollView>

      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        handleComponent={null}
        enableOverDrag={false}
        nestedScrollEnabled={true}
        animationDuration={0}
        style={sheetStyle}
        bottomInset={0}
        backgroundStyle={{
          borderRadius: 20, // 可选：让阴影更显得柔和
          shadowColor: '#000', // 阴影颜色
          shadowOffset: { width: 0, height: 4 }, // 阴影偏移
          shadowOpacity: 0.3, // 阴影透明度
          shadowRadius: 10, // 模糊半径
          elevation: 10, // Android 阴影
        }}
      >
        <View style={styles.sheetHeader}>
          <View style={styles.sheetHandler}>
            <View style={styles.handleBar} />
          </View>
          <Text style={styles.sheetHeaderTitle}>
            1111
          </Text>
        </View>
        <BottomSheetScrollView
          // keyboardShouldPersistTaps="handled"
          // showsVerticalScrollIndicator={false}
          // scrollEnabled={true}
          // nestedScrollEnabled={true}
          // scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  companyInfo: {
    flex: 1,
  },
  companyInfoContent: {
    padding: 12,
  },
  companyName: {
    marginBottom: 8,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s18,
    color: globalStyles.color.main,
  },
  companyAuth: {
    marginBottom: 8,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.sub,
  },
  blockTitle: {
    marginVertical: 8,
    fontSize: globalStyles.fontSize.s16,
  },
  blockContainer: {
    padding: 16,
    marginBottom: globalStyles.space.sm,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  companyCondition: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  companyLabel: {
    width: 80,
    marginRight: 4,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.main,
  },
  companyValue: {
    flex: 1,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.sub,
  },
  guarantee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  guaranteeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: globalStyles.color.blue,
  },
  guaranteeInfo: {
    flex: 1,
    marginLeft: 8,
  },
  guaranteeName: {
    marginBottom: 4,
    fontWeight: '700',
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.main,
  },
  guaranteeDesc: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.tip,
  },

  mockSheetBottom: {
    width: '100%',
    height: sheetFixedHeight,
    zIndex: 3,
  },
  sheetHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: screenWidth,
    shadowColor: '#000', // 阴影颜色
    shadowOffset: { width: 0, height: 4 }, // 阴影偏移
    shadowOpacity: 0.3, // 阴影透明度
    shadowRadius: 10, // 模糊半径
    elevation: 10, // Android 阴影
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: '#fff',
  },
  sheetHandler: {
    width: '100%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  sheetHeaderTitle: {
    width: '100%',
    height: 40,
  },
  sheetBottomList: {
    zIndex: 1,
  },
  mockRow: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
  },
});
export default CompanyInformation;
