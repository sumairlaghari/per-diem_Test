import React, {useEffect} from 'react';
import { LogBox, AppState } from 'react-native';
import { GlobalImports } from './src/config/globalImports';
import AppNavigatior from './src/route';
import OnBoarding from './src/screens/onBoarding';
import BootSplash from "react-native-bootsplash";
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import { requestUserPermission, createChannel, scheduleNotification } from './src/config/notificationService';
import BackgroundFetch from 'react-native-background-fetch';

const AppTwo = () => {
    const {onBoardState} = GlobalImports.useSelector(state => state?.onBoarding);

    useEffect(() => {
        LogBox.ignoreAllLogs(true);

        const init = async () => {
          // …do multiple sync or async tasks
        };
        init().finally(async () => {
          await BootSplash.hide({ fade: true });
          console.log("BootSplash has been hidden successfully");
        });

        requestUserPermission();
        createChannel();
    }, []);

    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
          switch (type) {
            case EventType.DISMISSED:
              console.log('User dismissed notification', detail.notification);
              break;
            case EventType.PRESS:
              console.log('User pressed notification', detail.notification);
              break;
          }
        });
        return () => {
          unsubscribe();
        };
    }, [])

    // Bootstrap sequence function
    async function bootstrap() {
        const initialNotification = await notifee.getInitialNotification();
    
        if (initialNotification) {
          console.log('Notification caused application to open', initialNotification.notification);
          console.log('Press action used to open the app', initialNotification.pressAction);
        }
    }
    
    useEffect(() => {
        bootstrap()
          .then(() => console.log('loadingComplete'))
          .catch(console.error);
    }, []);

    useEffect(()=>{
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                configureBackgroundFetch();       
                console.log('App is going to the background, scheduling task.');     
            }else {
                await BackgroundFetch.stop('com.awesomeproject.scheduleNotification');
                console.log('App has come to the foreground, cancelling task if scheduled.');
            }
          };
        
          // Add the AppState change listener
          const subscription = AppState.addEventListener('change', handleAppStateChange);
        
          // Cleanup the listener when the component unmounts or when navigating away
          return () => {
            subscription.remove(); // Remove the listener
          };
    },[])

    const configureBackgroundFetch = () => {
        // Schedule a one-time background fetch task to run 10 minutes after app is closed
        BackgroundFetch.scheduleTask({
          taskId: 'com.awesomeproject.scheduleNotification',
          delay: 1 * 60 * 1000, // 10 minutes in milliseconds
          stopOnTerminate: false, // Continue to run when the app is terminated
          startOnBoot: true, // Automatically restart after device reboot
          forceAlarmManager: true, // Force using AlarmManager on Android to ensure reliability
          periodic: false, // Only run once
          enableHeadless: true,
        });

        // Start BackgroundFetch
        BackgroundFetch.start();
      };  
      
    return(
        <>
            {onBoardState ? <AppNavigatior/> : <OnBoarding/>}
        </>
    )
}

export default AppTwo