import {COLORS, hp2, wp2, ICONS, IMAGES, fonts, Languages} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import types from '../redux/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {errorMessage, successMessage} from '../config/notificationMessage';
import {errorHandler} from '../config/helperFunction';
import {SkypeIndicator,UIActivityIndicator} from 'react-native-indicators';

export const GlobalImports = {
  COLORS,
  Languages,
  hp2,
  wp2,
  ICONS,
  IMAGES,
  fonts,
  useDispatch,
  useSelector,
  types,
  wp,
  hp,
  rfp,
  rfv,
  errorMessage,
  successMessage,
  SkypeIndicator,
  errorHandler,
  UIActivityIndicator,
};
