import {StyleSheet, Platform, StatusBar} from 'react-native';
import {GlobalImports} from '../../config/globalImports';

const getStyles = colors => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.statusBar,
    paddingTop: Platform?.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  wrapper:{
    flex:1,
    backgroundColor: colors.themeColor,
    justifyContent:'center',
  },
  loginHeading:{
    color:'white',
    fontFamily:GlobalImports.fonts.bold,
    fontSize:GlobalImports.rfv(22),
    marginVertical:GlobalImports.hp2(2),
    marginLeft:GlobalImports.wp2(4),
  },
});
export default getStyles;
