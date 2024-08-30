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
  heading:{
    color:'white',
    fontFamily:GlobalImports.fonts.bold,
    fontSize:GlobalImports.rfv(22),
    marginVertical:GlobalImports.hp2(2),
    marginLeft:GlobalImports.wp2(4),
  },

  //---ItemCompStyles---//
  compContainer:{
    width:GlobalImports.wp2(90),
    overflow:'hidden',
    borderRadius:GlobalImports.wp2(4),
    backgroundColor:'white',
    marginVertical:GlobalImports.hp2(2),
    marginHorizontal:GlobalImports.wp2(5),
    paddingTop:GlobalImports.hp2(6),
    paddingBottom:GlobalImports.hp2(2),
    paddingHorizontal:GlobalImports.wp2(2),
    alignItems:'center',
  },
  compText:{
    color:colors.commonBlack,
    fontFamily:GlobalImports.fonts.bold,
    fontSize:GlobalImports.rfv(12),
  },
  //---End---//

});
export default getStyles;
