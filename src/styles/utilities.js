import { Dimensions, DeviceInfo, Platform } from 'react-native';
import { Header } from 'react-navigation';

export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';

export const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height += DeviceInfo.isIPhoneX_deprecated && orientation === PORTRAIT ? 24 : 0;
  return height;
};

// Use this when you need a custom headerTitle component
// (does not include iPhoneX bar area)
export const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 32;
  }
  return Header.HEIGHT;
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};