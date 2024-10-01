import {StyleSheet, Platform, StatusBar} from 'react-native';
import {GlobalImports} from '../../config/globalImports';

const getStyles = () => {
  const colors = GlobalImports.COLORS();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.statusBar,
      paddingTop: Platform?.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    wrapper: {
      flex: 1,
      backgroundColor: colors.themeColor,
    },
    headingWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: GlobalImports.hp2(1),
    },
    heading: {
      fontSize: GlobalImports.rfv(16),
      color: colors.commonWhite,
      fontFamily: GlobalImports.fonts.bold,
    },
    coinWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    coinStyles: {
        width: GlobalImports.wp2(66),
        height: GlobalImports.wp2(66),
        borderRadius:GlobalImports.wp2(100),
        borderWidth:1,
        borderColor:'white',
    },
  });
};

export default getStyles;
