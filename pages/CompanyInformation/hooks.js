import { useCallback, useRef, useMemo } from 'react';
import {
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';


export const { height: screenHeight, width: screenWidth } = Dimensions.get('window'); // 获取屏幕高度

//
export const sheetFixedHeight = 64;

export const useCustomStickLogic = () => {
  // hooks
  const sheetRef = useRef(null);
  // 可滚动距离
  const scrollClientShare = useSharedValue(0);
  // 滚动可视区
  const scrollShare = useSharedValue({
    height: 0, // 滚动可视区高度
  });
  // 粘性物
  const stickyShare = useSharedValue({
    height: 0, // 粘性元素的高度
    offsetY: 0, // 粘性元素距离父容器顶部的距离
  });
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const stickyOffset = useDerivedValue(() => {
    // 吸附在底部
    // 粘性目标距离滚动容器顶部的距离大于滚动空间
    // 滚动距离小于粘性物距离滚动容器顶部的高度+粘性物本身高度
    if (
      stickyShare.value.offsetY > scrollShare.value.height &&
      scrollOffset.value + scrollShare.value.height < stickyShare.value.offsetY + stickyShare.value.height
    ) {
      return scrollShare.value.height - stickyShare.value.offsetY - stickyShare.value.height + scrollOffset.value;
    }

    // 吸附顶部
    // 当前滚动的距离超过粘性物本身所在位置
    if (scrollOffset.value > stickyShare.value.offsetY) {
      return scrollOffset.value - stickyShare.value.offsetY;
    }

    return 0;
  });
  // 获取滚动容器信息
  const onLayoutScroll = useCallback((event) => {
    const { height } = event.nativeEvent.layout;

    scrollShare.value = { height };
  }, []);
  // 获取粘性物信息
  const onLayoutSticky = useCallback((event) => {
    const { y, height } = event.nativeEvent.layout;

    stickyShare.value = {
      offsetY: y,
      height: height,
    };
  }, []);
  // 获取滚动相关信息
  const handleContentSizeChange = useCallback((contentWidth, contentHeight) => {
    // const scrollHeight = contentHeight - screenHeight; // 计算可滚动距离

    scrollClientShare.value = Math.max(contentHeight, 0); // 确保滚动距离不为负
  }, []);
  const snapPoints = useMemo(() => [sheetFixedHeight, screenHeight - sheetFixedHeight], []);
  // 粘性物的样式
  const stickyStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: stickyOffset.value,
        },
      ],
      opacity: stickyOffset.value + sheetFixedHeight < 0 ? 0 : 1,
    };
  });
  // 没有展示列表时，底部固定的视图
  const sheetStyle = useAnimatedStyle(() => {
    const result = stickyOffset.value + sheetFixedHeight < 0;

    return {
      opacity: result ? 1 : 0,
    };
  });


  return {
    scrollRef,
    sheetRef,
    sheetStyle,
    onLayoutScroll,
    onLayoutSticky,
    handleContentSizeChange,
    snapPoints,
    stickyStyles,
  };
};
export const useStickyScroll = (ref) => {
};
