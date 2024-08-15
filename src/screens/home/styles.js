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
  },
  headingWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:GlobalImports.wp2(6),
    marginVertical:GlobalImports.hp2(1),
  },
  heading:{
    fontSize:GlobalImports.rfv(16),
    color:colors.commonWhite,
    fontFamily:GlobalImports.fonts.bold,
  },
  buttonStyle:{
    backgroundColor:colors.button,
    width:GlobalImports.wp2(24),
    height:GlobalImports.hp2(5),
    borderRadius:GlobalImports.wp2(2),
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText:{
    fontFamily:GlobalImports.fonts.bold,
    color:colors.buttonText,
  },
  noDataText:{
    fontSize:GlobalImports.rfv(16),
    color:colors.commonWhite,
  },
  noDataView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
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
  compDeleteButton:{
    width:GlobalImports.wp2(24),
    height:GlobalImports.hp2(4),
    borderRadius:GlobalImports.wp2(2),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red',
    alignSelf:'center',
    marginTop:GlobalImports.hp2(2),
  },
  compToggleButton:{
    position:'absolute',
    zIndex:9,
    right:GlobalImports.wp2(4),
    top:GlobalImports.hp2(1),
  },
  //---End---//

  createItemContainer:{
    flex:1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputWrap:{
    width:GlobalImports.wp2(80),
    padding:20,
    overflow:'hidden',
    backgroundColor:'#2B2D2E',
    borderRadius:10,
  },
  crossButton:{
    backgroundColor:colors.commonWhite,
    width:GlobalImports.wp2(6),
    height:GlobalImports.wp2(6),
    borderRadius:100,
    alignItems:'center',
    overflow:'hidden',
    justifyContent:'center',
    position:'absolute',
    top:GlobalImports.hp2(1),
    right:GlobalImports.wp2(2),
    zIndex:9,
  },
  inputField:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
    marginVertical:10,
  },
  inputContainer:{
    width: GlobalImports.wp2(54),
    height:GlobalImports.hp2(6),
    borderBottomWidth:1,
    borderColor:'#FFFFFF',
  },
  input:{
    flex: 1,
    color: colors?.commonWhite,
  },
  submitButton:{
    backgroundColor:'#FFFFFF',
    width:GlobalImports.wp2(60),
    height:GlobalImports.hp2(5),
    borderRadius:GlobalImports.wp2(2),
    alignItems:'center',
    overflow:'hidden',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:GlobalImports.hp2(2),
  },
});
export default getStyles;
