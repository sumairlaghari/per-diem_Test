import React, {useEffect,useRef,useState} from 'react';
import { Alert, LogBox, AppState } from 'react-native';
import { GlobalImports } from './src/config/globalImports';
import AppNavigatior from './src/route';
import OnBoarding from './src/screens/onBoarding';
import BootSplash from "react-native-bootsplash";
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import { requestUserPermission, createChannel, scheduleNotification } from './src/config/notificationService';
import BackgroundFetch from 'react-native-background-fetch';

const AppTwo = () => {
    const {onBoardState} = GlobalImports.useSelector(state => state?.onBoarding);
    const {list} = GlobalImports.useSelector(state => state?.listData);
    const [appState, setAppState] = useState(AppState.currentState);
    const taskScheduled = useRef(false);

    // Create a ref to hold the latest list value
    const listRef = useRef(list);

        // Update the ref whenever list changes
        useEffect(() => {
            listRef.current = list;
        }, [list]);
    
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
        //configureBackgroundFetch();
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

    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground, cancelling task if scheduled.');
                // Cancel the task if it was scheduled
                if (taskScheduled.current) {
                    await BackgroundFetch.stop();
                    taskScheduled.current = false;
                }
            } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
                console.log('App is going to the background, scheduling task.');
                // Schedule the task when app is going to the background
                configureBackgroundFetch();
                taskScheduled.current = true;
            }

            setAppState(nextAppState);
        };

        //const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            //subscription.remove();
        };
    }, [appState]);

    useEffect(()=>{
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                configureBackgroundFetch();       
                console.log('App is going to the background, scheduling task.');     
            }else {
                await BackgroundFetch.stop('com.yourapp.scheduleNotification');
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

    // const configureBackgroundFetch = () => {
    //     BackgroundFetch.configure(
    //       {
    //         minimumFetchInterval: 15, // Fetch interval in minutes
    //         stopOnTerminate: false, // Continue to run when app is terminated
    //         startOnBoot: true, // Automatically restart after device reboot
    //         forceAlarmManager: true,
    //       },
    //       async (taskId) => {
    //         console.log("[BackgroundFetch] taskId:", taskId);
    //         // Perform your background task here
    //         await scheduleNotification(list); // Pass the list to this function
    //         BackgroundFetch.finish(taskId);
    //       },
    //       async (taskId) => {
    //         console.log("[BackgroundFetch] failed to start:");
    //         BackgroundFetch.finish(taskId);
    //       }
    //     );
    
    //     BackgroundFetch.start();
    // }
      
    const configureBackgroundFetch = () => {
        // Schedule a one-time background fetch task to run 20 minutes after app is closed
        BackgroundFetch.scheduleTask({
          taskId: 'com.yourapp.scheduleNotification',
          delay: 5000, // 20 minutes in milliseconds
          stopOnTerminate: false, // Continue to run when the app is terminated
          startOnBoot: true, // Automatically restart after device reboot
          forceAlarmManager: true, // Force using AlarmManager on Android to ensure reliability
          periodic: false, // Only run once
          enableHeadless: true,
        });
      
        // Define the background fetch configuration
        BackgroundFetch.configure(
          {
            minimumFetchInterval: 15, // This setting is ignored for scheduled tasks
            stopOnTerminate: false,
            startOnBoot: true,
            forceAlarmManager: true,
            enableHeadless: true,
          },
          async (taskId) => {
            console.log('[BackgroundFetch] taskId:', taskId);
            
            // Perform your background task here
            //await scheduleNotification(listRef.current);
           
      
            // Important: Always call finish to signal completion
            BackgroundFetch.finish(taskId);
          },
          (error) => {
            console.log('[BackgroundFetch] failed to start:', error);
          }
        );
      
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