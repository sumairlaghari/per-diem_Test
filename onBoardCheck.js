import React from 'react';
import { GlobalImports } from './src/config/globalImports';
import AppNavigatior from './src/route';
import OnBoarding from './src/screens/onBoarding';

const OnBoardingCheck = () => {
    const {onBoardState} = GlobalImports.useSelector(state => state?.onBoarding)
    
    return(
        <>
            {onBoardState ? <AppNavigatior/> : <OnBoarding/>}
        </>
    )
}

export default OnBoardingCheck