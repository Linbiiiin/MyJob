import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import globalStyles from '../../contants/globalStyles';
import AdeptSafeViewArea from '../../components/AdeptSafeViewArea';


const Square = () => {
  return (
    <AdeptSafeViewArea>
      <View style={styles.squareContainer}>
        <Text style={styles.squareTitle}>兼职广场</Text>
        <View style={styles.squarePosition}>
          <Text>定位</Text>
          <Text>厦门·软件园三期C区</Text>
        </View>
      </View>
    </AdeptSafeViewArea>
  );
};


const styles = StyleSheet.create({
  squareContainer: {
    flex: 1,
    paddingHorizontal: globalStyles.space.s10
  },
  squareTitle: {
    paddingVertical: globalStyles.space.s14,
    fontSize: globalStyles.fontSize.s20
  },
  squarePosition: {
    flexDirection: 'row',
    padding: globalStyles.space.s10,
    borderRadius: globalStyles.radius.s16,
    backgroundColor: globalStyles.color.white
  }
});

export default Square;
