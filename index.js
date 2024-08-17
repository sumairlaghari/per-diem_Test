/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, { EventType } from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';
import { scheduleNotification } from './src/config/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.PRESS) {
        console.log('User pressed notification from background', notification);
        
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
});

let MyHeadlessTask = async (event) => {
    let taskId = event.taskId;
    let isTimeout = event.timeout;  // <-- true when your background-time has expired.
    if (isTimeout) {
      // This task has exceeded its allowed running-time.
      // You must stop what you're doing immediately finish(taskId)
      console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
      BackgroundFetch.finish(taskId);
      return;
    }
    console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
    try {
        const jsonValue = await AsyncStorage.getItem('persist:listData');
        if (jsonValue != null) {
            const parsedData = JSON.parse(jsonValue);
            let list = parsedData?.list;

            // Parse the list again if it is a string
            if (typeof list === 'string') {
                list = JSON.parse(list);
            }

            if (Array.isArray(list)) {
                console.log('Retrieved listData:', list);

                // Now schedule the notification using the list data
                await scheduleNotification(list);
            } else {
                console.log('No valid list found in listData.');
            }
        } else {
            console.log('No listData found in AsyncStorage.');
        }
    } catch (error) {
        console.log('Error retrieving listData from AsyncStorage:', error);
    }
    BackgroundFetch.finish(taskId);
  }

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
