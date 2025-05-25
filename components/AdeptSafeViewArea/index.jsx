import React, { useMemo } from 'react';
import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const paddingMap = {
  top: 'paddingTop',
  left: 'paddingLeft',
  bottom: 'paddingBottom',
  right: 'paddingRight',
};

const AdeptSafeViewArea = (props) => {
  const { children, backgroundColor = '#f5f5f5', excludesDirect = [], includesDirect = [] } = props;
  const insets = useSafeAreaInsets();
  const safeAreaStyle = useMemo(() => {
    let validPadding = ['top', 'bottom', 'left', 'right'];

    if (excludesDirect.length > 0) {
      validPadding = validPadding.filter((k) => !excludesDirect.includes(k));
    }

    if (includesDirect.length > 0) {
      validPadding = validPadding.filter((k) => includesDirect.includes(k));
    }
    return validPadding.reduce((res, d) => {

      res[paddingMap[d]] = insets[d];
      return res;
    }, {
      flex: 1,
      backgroundColor,
    });
  }, [insets, backgroundColor, excludesDirect, includesDirect]);

  return (
    <View style={safeAreaStyle}>
      {children}
    </View>
  );
};


export default AdeptSafeViewArea;
