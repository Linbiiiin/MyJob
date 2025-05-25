import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { Bubble, Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

import AdeptSafeViewArea from '../../components/AdeptSafeViewArea';
import { ACCESSORY, useChatWindow } from './hooks';
import globalStyles from '../../contants/globalStyles';
import Icon from '../../components/Icon';

const RenderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: globalStyles.color.blue,  // 设置自己发送的消息背景色
        },
        left: {
          backgroundColor: globalStyles.color.white,  // 设置他人消息背景色
        },
      }}
    />
  );
};

// 自定义消息输入框
const RenderComposer = (props) => {
    const { onToggleEmoji, showEmojiContainer, textInputRef, onToggleKeyword, onSelectionChange, ...composerProps } = props;

    return (
      <View style={styles.renderComposer}>
        <View style={styles.customComposer}>
          {/* 左侧添加按钮 */}
          <Pressable>
            <Text style={styles.commonExpressions}>常用语</Text>
          </Pressable>

          {/* 输入框 */}
          <Composer
            {...composerProps}
            // multiline={true}
            // textAlignVertical="center"
            // composerHeight={40}
            textInputStyle={styles.composerInput}
            textInputProps={{
              ...composerProps.textInputProps,
              onChangeText: t => {
                if (/[\n\r]/g.test(t)) {
                  return ;
                }
                composerProps.onTextChanged(t);
                // setText(t.replace(/[\n\r]/g, ' '));
              },
              ref: (ref) => (textInputRef.current = ref),
              onFocus: () => {
                if (showEmojiContainer) {
                  onToggleEmoji();
                }
              },
              // onSubmitEditing: () => {
              //   // 检测是否按下了 Shift/Control 键
              //   if (composerProps.text.trim()) {
              //     composerProps.onTextChanged('');
              //     composerProps.onSend({ text: composerProps.text }, true);
              //   }
              // },
              onKeyPress: ({ nativeEvent }) => {
                if (nativeEvent.key === 'Enter') {
                  composerProps.onSend({ text: composerProps.text.replace(/[\r\n]/g, '') }, true);
                  composerProps.onTextChanged('');
                  return true;
                }
              },
              // onSelectionChange: (e) => {
              //   onSelectionChange?.(e);
              // },
              // 是否一直显示发送按钮
              alwaysShowSend: true,
              // 是否多行输入
              multiline: true,
              // 回车后是否失去焦点
              blurOnSubmit: false,
              returnKeyType: 'send',
              // returnKeyType: Platform.OS === 'ios' ? 'send' : 'done',
              enablesReturnKeyAutomatically: true, // 空内容时禁用发送按钮
            }}
          />

          {/* 右侧发送按钮 */}
          <View style={styles.composerRight}>
            <Pressable style={styles.composerRightIcon}>
              {
                showEmojiContainer ?
                  <Icon name="keyboard" size={24} onPress={onToggleKeyword} />
                  :
                  <Icon name="emote" size={24} onPress={onToggleEmoji} />
              }
            </Pressable>
            <Pressable style={styles.composerRightIcon}>
              <Icon name="expand" size={28} />
            </Pressable>

          </View>
        </View>
        {/*<View style={[styles.extendComposer, { height: h }]}></View>*/}
      </View>
    );
  };


// 自定义输入工具栏
const RenderInputToolbar = (props) => {

  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
    />
  );
};
const TOOL_INPUT_MAX_HEIGHT = 170;
const EMO_HEIGHT = 200;
const TOOL_MAX_HEIGHT = TOOL_INPUT_MAX_HEIGHT + EMO_HEIGHT;

const ChatWindow = (props) => {
  const {
    text,
    onTextChanged,
    messages,
    currentRenderAccessory,
    onToggleEmoji,
    onToggleKeyword,
    textInputRef,
    onSelectedEmoji,
    onSelectionChange,
    onSendMessage,
  } = useChatWindow(props);
  const showEmojiContainer = useMemo(() => currentRenderAccessory === ACCESSORY.emoji, [currentRenderAccessory]);
  const [emojiActionsOpacity, setEmojiActionsOpacity] = useState(1);

  const handleEmojiScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);

    // 当距离底部按钮区域 60px 时开始改变透明度
    if (distanceFromBottom < 60) {
      const opacity = Math.max(0.3, distanceFromBottom / 60);
      setEmojiActionsOpacity(opacity);
    } else {
      setEmojiActionsOpacity(1);
    }
  };

  // 渲染表情面板
  const renderEmojiPicker = () => {
    if (!showEmojiContainer) return null;

    return (
      <View style={styles.emoContainer}>
        <EmojiSelector
          showTabs={false}
          showSearchBar={false}
          showSectionTitles={false}
          columns={8}
          category={Categories.emotion}
          onEmojiSelected={onSelectedEmoji}
          onScroll={handleEmojiScroll}
        />
        <View style={styles.emojiActions}>
          <Text style={styles.emojiSendText}>删除</Text>
          <Text style={styles.emojiSendText}>发送</Text>
        </View>
      </View>
    );
  };

  return (
    <AdeptSafeViewArea excludesDirect={['top']} backgroundColor="#fff">
      <KeyboardAvoidingView style={styles.chatWindow}>
        <GiftedChat
          messages={messages}
          onSend={onSendMessage}
          showUserAvatar
          user={{ _id: 3, avatar: require('../../assets/images/avatar-2.jpeg') }}
          renderBubble={RenderBubble}
          placeholder="请输入"
          alwaysShowSend={false}
          renderAccessory={renderEmojiPicker}
          accessoryStyle={{ height: showEmojiContainer ? styles.emoContainer.height : 0 }}
          renderInputToolbar={RenderInputToolbar}
          renderComposer={cProps => <RenderComposer {...cProps} text={text} onTextChanged={onTextChanged} onSelectionChange={onSelectionChange} textInputRef={textInputRef} showEmojiContainer={showEmojiContainer} onToggleEmoji={onToggleEmoji} onToggleKeyword={onToggleKeyword} />}
          renderSend={() => <Fragment />}
          // bottomOffset={}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </AdeptSafeViewArea>
  );
};

const styles = StyleSheet.create({
  chatWindow: {
    flex: 1,
  },
  inputToolbar: {
    maxHeight: TOOL_MAX_HEIGHT,
    backgroundColor: '#fff',
  },
  renderComposer: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  customComposer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  extendComposer: {
    width: '100%',
  },
  composerInput: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 6,
    maxHeight: TOOL_INPUT_MAX_HEIGHT,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: globalStyles.fontSize.s16,
    color: '#333',
    backgroundColor: '#fff',
  },
  commonExpressions: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginBottom: 4,
    fontSize: globalStyles.fontSize.s14,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 4,
  },
  composerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  composerRightIcon: {
    marginLeft: 4,
  },
  emoContainer: {
    width: '100%',
    height: EMO_HEIGHT, // 调整合适的高度
    overflow: 'auto',
    position: 'relative',
    backgroundColor: '#f7f7f7',
  },
  emojiSelector: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  emojiActions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
  },
  emojiSendText: {
    marginLeft: 10,
    padding: 10,
    fontSize: 14,
    color: 'rgba(0, 0, 0, .6)',
    borderRadius: 8,
    backgroundColor: '#e8e8e8'
  }
});

export default ChatWindow;
