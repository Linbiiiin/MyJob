import React, { useCallback } from 'react';
import { Text, StyleSheet, View, Pressable, FlatList } from 'react-native';

import Swiper from 'react-native-swiper';

import { useChatMessage } from './hooks';

import globalStyles from '../../contants/globalStyles';

// const FlatListContext = React.createContext({});

const notifications = [
  '完善建立，提升求职概率',
  '消息通知测试',
];

// swipeble右边滑动距离
const rightActionDistance = 80;


const ChatMessage = (props) => {
  const { onLinkCurriculumVitae, onLinkChatWindow, activeSwipeableRef, handleSwipeableOpen } = useChatMessage(props);
  const MessageCard = useCallback((data) => {
    const {
      item,
      index,
    } = data;

    return (
      <Pressable onPress={() => onLinkChatWindow({ username: `${item.name}-${index}` })}>
        <View style={styles.noticeCard}>
          <View style={styles.avatar} />
          <View style={styles.noticeMain}>
            <Text style={styles.noticeName}>系统通知</Text>
            <View>
              <Text numberOfLines={1} style={styles.noticeText}>测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</Text>
              <Text numberOfLines={1} style={styles.noticeText}>测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</Text>
            </View>
          </View>
          <Text style={styles.noticeTime}>21:40</Text>
        </View>
      </Pressable>
    );
  }, [onLinkChatWindow]);

  return (
    <View style={styles.chatMessage}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Swiper
            style={styles.noticesCarousel}
            showsPagination={false} // 隐藏分页指示器
            horizontal={false} // 设置为垂直方向
            autoplay={true} // 开启自动播放
            loop={true} // 无限循环
            autoplayTimeout={3} // 自动播放间隔（秒）
          >
            {notifications.map((message, index) => (
              <View key={`notice-${index}`} style={styles.carouselItem}>
                <Text style={styles.carouselMsg}>{message}</Text>
                <Pressable style={styles.linkStyle} onPress={onLinkCurriculumVitae}>
                  <Text style={styles.linkText}>去完善</Text>
                </Pressable>
              </View>
            ))}
          </Swiper>
        </View>
      </View>
      <View style={styles.noticeList}>
        <FlatList
          data={[{ name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }, { name: '小明' }]}
          // initialNumToRender={fastList.page.linesPerPage}
          // maxToRenderPerBatch={fastList.page.linesPerPage}
          renderItem={MessageCard}
          // keyExtractor={FastListKey}
          // onEndReached={fastList.api.more}
          // onEndReachedThreshold={0.3} // 提前触发加载的距离
          ListFooterComponent = {() => (<View style={{ marginTop: 10 }} />)}
          // refreshControl={ListRefreshComponent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatMessage: {
    flex: 1,
  },
  delStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: rightActionDistance,
    height: '100%',
    fontWeight: 700,
    fontSize: globalStyles.fontSize.s18,
    color: '#fff',
    backgroundColor: globalStyles.color.red,
  },
  header: {
    width: '100%',
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerContent: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: globalStyles.color.blue,
    borderRadius: 15,
    backgroundColor: globalStyles.color.blue15,
  },
  noticesCarousel: {
    // flex: 1,
  },
  carouselItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  carouselMsg: {
    flex: 1,
    alignItems: 'center',
    marginRight: 20,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.black75,
  },
  linkStyle: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: globalStyles.color.blue,
  },
  linkText: {
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.white,
  },
  noticeList: {
    flex: 1,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: globalStyles.color.white,
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: globalStyles.color.blue,
  },
  noticeMain: {
    flex: 1,
  },
  noticeName: {
    flex: 1,
    fontSize: globalStyles.fontSize.s16,
    color: globalStyles.color.black75,
  },
  noticeTime: {
    fontSize: globalStyles.fontSize.s10,
    color: globalStyles.color.black15,
  },
  noticeText: {
    marginTop: 4,
    fontSize: globalStyles.fontSize.s12,
    color: globalStyles.color.black30,
  },
});

export default ChatMessage;
