import {StyleSheet, Platform, StatusBar} from 'react-native';
import {GlobalImports} from '../../config/globalImports';

const getStyles = colors => StyleSheet.create({
  container: {
    flex: 1,
  },
  imgWrap:{
    width: GlobalImports.wp2(100),
    height: GlobalImports.hp2(100),
    overflow:'hidden',
  },
  //---textCompStyles---//
  textCompContainer:{
    width: GlobalImports.wp2(100),
    paddingHorizontal:GlobalImports.wp2(8),
    position:'absolute',
    zIndex:9,
    bottom:GlobalImports.hp2(20),
  },
  textCompTextOne:{
    color:'white',
    fontSize:GlobalImports.rfv(18),
    marginBottom:6,
    fontFamily:GlobalImports.fonts.medium,
  },
  textCompTextTwo:{
    color:'white',
    fontSize:GlobalImports.rfv(12),
    fontFamily:GlobalImports.fonts.regular,
  },
  //---End---//
  nextButton:{
    backgroundColor:colors.button,
    width:GlobalImports.wp2(80),
    height:GlobalImports.hp2(6),
    borderRadius:GlobalImports.wp2(10),
    alignItems:'center',
    overflow:'hidden',
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    zIndex:9,
    bottom:GlobalImports.hp2(8),
  },
});
export default getStyles;
