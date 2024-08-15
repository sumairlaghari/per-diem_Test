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
  inputBox:{
    flex: 1,
    color:'white',
    paddingHorizontal: GlobalImports.wp2(2),
    fontFamily:GlobalImports.fonts.medium,
  },
  loginButton:{
    backgroundColor:colors.button,
    width:GlobalImports.wp2(90),
    height:GlobalImports.hp2(6),
    borderRadius:GlobalImports.wp2(2),
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginVertical:GlobalImports.hp2(1),
  },
  buttonText:{
    fontFamily:GlobalImports.fonts.bold,
    color:colors.buttonText,
  },
});
export default getStyles;
