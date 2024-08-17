import notifee, { AndroidImportance, AuthorizationStatus, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';

export async function requestUserPermission() {
    const settings = await notifee.requestPermission();
  
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission granted');
    } else {
      console.log('Permission denied');
    }
}

export async function createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
}

export async function scheduleNotification(list) {
    // Assuming 'list' is accessible within this function
    if (!list || list.length === 0) {
      console.log('No toggles available to check.');
      return; // Exit if the list is empty
    }
  
    // Filter the list to find indexes of toggles that are ON (true)
    const onToggles = list
      .map((item, index) => (item.toggleState ? index : null))
      .filter(index => index !== null);
  
    if (onToggles.length === 0) {
      console.log('No toggles are ON.');
      return; // Exit if no toggleState is true
    }
  
    const message = `Toggles on index ${onToggles.join(', ')} are ON`;
  
    // Create a trigger notification (1 minute from now)
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 1);
  
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      //timestamp: date.getTime(), // Set the timestamp to 1 minute later
      //timestamp: Date.now() + 10 * 1000,
      timestamp: Date.now() + 1 * 1000,
    };

    await notifee.createTriggerNotification(
      {
        title: 'Toggle Status',
        body: message,
        android: {
          channelId: 'default', // Use a channel ID that you create for Android
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger
    );
    
    console.log('Notification scheduled:', message);
}