export const COLORS = themeMode => {
    return(
        themeMode == 'dark' ? {
            // Dark Mode
                // App Main Colors
                commonWhite: '#FFFFFF',
                commonBlack: '#000000',
                placeholderCommonWhite: '#FFFFFF50',
                themeColor: '#000000',
                statusBar: '#000000',
                button:'#21A01E',
                buttonText:'#FFFFFF',
                loaderColor:'#FFFFFF',
                loaderColor2:'#000000',

        } : themeMode == 'light' ? {
            // Light Mode
                // App Main Colors
                commonWhite: '#0D0D0D',
                commonBlack: '#FFFFFF',
                placeholderCommonWhite: '#0D0D0D50',
                themeColor: '#E3E2E5',
                statusBar: '#E3E2E5',
                button:'#29CB26',
                buttonText:'#0D0D0D',
                loaderColor:'#0D0D0D',
                loaderColor2:'#FFFFFF',

        } : {
            //Default Dark Mode
                // App Main Colors
                commonWhite: '#FFFFFF',
                commonBlack: '#000000',
                placeholderCommonWhite: '#FFFFFF50',
                themeColor: '#000000',
                statusBar: '#000000',
                button:'#21A01E',
                buttonText:'#FFFFFF',
                loaderColor:'#FFFFFF',
                loaderColor2:'#000000',
        }
    )
}