import React from 'react';
import { View, Image, Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

import colors from '../../utils/colors';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const Header = () => {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: STATUSBAR_HEIGHT + 40, paddingBottom: 24, backgroundColor: colors.blue, flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require("./adaptive-icon.png")} style={{ width: 60, height: 60 }}/>
    </View>
  )
}

export default Header