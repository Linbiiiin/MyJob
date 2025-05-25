import {useCallback, useRef, useState} from 'react';
import globalRouter from '../../contants/globalRouter';

export const useChatMessage = (props) => {
  const { navigation } = props;
  const activeSwipeableRef = useRef({});
  const onLinkCurriculumVitae = useCallback(() => {
    navigation.navigate(globalRouter.mine_curriculum_vitae);
  }, [navigation]);
  const handleSwipeableOpen = useCallback((key) => {
    // 当某个 Swipeable 打开时，关闭其他 Swipeable
    Object.keys(activeSwipeableRef.current).forEach((refKey) => {
      if (String(refKey) !== String(key) && activeSwipeableRef.current[refKey]) {
        activeSwipeableRef.current[refKey].close();
      }
    });
  }, []);
  const onLinkChatWindow = useCallback((params) => {
    navigation.navigate(globalRouter.chat_window, params);
  }, [navigation]);

  return {
    onLinkCurriculumVitae,
    activeSwipeableRef,
    handleSwipeableOpen,
    onLinkChatWindow,
  };
};
