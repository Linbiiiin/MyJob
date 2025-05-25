import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, LayoutAnimation, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

// 聊天底部渲染的工具
export const ACCESSORY = {
  emoji: 'emoji', // 表情
  keyword: 'keyword', // 键盘
  discourse: 'discourse', // 常用语
  tools: 'tools', // 其他工具
};

export const useChatWindow = (props) => {
  const { route, navigation } = props;
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello! How can I help you?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Support',
        avatar: require('../../assets/images/avatar-1.jpg'),
      },
    },
  ]);
  const textInputRef = useRef(null);
  // 当前聊天底部的渲染的工具栏
  const [currentRenderAccessory, setCurrentRenderAccessory] = useState(null);
  const cursorPosRef = useRef(null);
  // 当前输入的字符串
  const [text, setText] = useState('');
  // 聊天功附件区域的相关处理逻辑
  const onToggleAccessory = useCallback((v) => {
    setCurrentRenderAccessory(pre => {
      const next = pre === v ? null : v;

      // 表情
      if (next === ACCESSORY.emoji) {
        textInputRef.current?.blur?.();
      }

      // 键盘
      if (next === ACCESSORY.keyword) {
        textInputRef.current?.focus?.();
      }

      return next;
    });
  }, []);
  // 点击表情的icon
  const onToggleEmoji = useCallback(() => {
    onToggleAccessory(ACCESSORY.emoji);
  }, [onToggleAccessory]);
  // 点击键盘的icon
  const onToggleKeyword = useCallback(() => {
    onToggleAccessory(ACCESSORY.keyword);
  }, [onToggleAccessory]);
  const onSelectionChange = useCallback((e) => {
    cursorPosRef.current = e.nativeEvent.selection;
    console.log(cursorPosRef.current);
  }, []);
  // 选择表情的操作
  const onSelectedEmoji = useCallback((emoji) => {
    setText(pre => {
      const cursorPos = cursorPosRef.current;
      let next = '';

      console.log(pre);
      if (cursorPos) {
        next =
          pre.slice(0, cursorPos.start) +
          emoji +
          pre.slice(cursorPos.start);

      } else {
        next = pre + emoji;
      }

      return next;
    });
  }, []);

  const onTextChanged = useCallback((s) => {
    setText(s);
  }, []);

  const onSendMessage = (msgArr = []) => {
    cursorPosRef.current = null;
    setMessages(GiftedChat.append(messages, msgArr));
  };


  useEffect(() => {
    const { username } = route.params || {};
    navigation.setOptions({
      title: username,
    });
    //
    // navigation.addListener('beforeRemove', (e) => {
    //   console.log('ggg')
    //   Keyboard.dismiss();
    //
    // })
  }, [route.params, navigation]);


  return {
    text,
    onTextChanged,
    currentRenderAccessory,
    onToggleEmoji,
    onToggleKeyword,
    textInputRef,
    onSelectedEmoji,
    onSendMessage,
    messages,
    onSelectionChange,
  };
};
