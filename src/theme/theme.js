import {GlobalImports} from '../config/globalImports';
export const COLORS = () => {
  const themeMode = GlobalImports.useSelector(state => state.themeMode.state);

  return themeMode === 'dark'
    ? {
        // Dark Mode
        commonWhite: '#FFFFFF',
        commonBlack: '#000000',
        placeholderCommonWhite: '#FFFFFF50',
        themeColor: '#000000',
        statusBar: '#000000',
        button: '#21A01E',
        buttonText: '#FFFFFF',
        loaderColor: '#FFFFFF',
        loaderColor2: '#000000',
      }
    : {
        // Light Mode
        commonWhite: '#0D0D0D',
        commonBlack: '#FFFFFF',
        placeholderCommonWhite: '#0D0D0D50',
        themeColor: '#E3E2E5',
        statusBar: '#E3E2E5',
        button: '#29CB26',
        buttonText: '#0D0D0D',
        loaderColor: '#0D0D0D',
        loaderColor2: '#FFFFFF',
      };
};
