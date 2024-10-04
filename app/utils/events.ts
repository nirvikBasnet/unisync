import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveEvent = async (dateKey: string, event: string) => {
  try {
    // Get existing events
    const existingEvents = await AsyncStorage.getItem('events');
    const events = existingEvents ? JSON.parse(existingEvents) : {};

    // Add or update the event
    events[dateKey] = event;

    // Save back to AsyncStorage
    await AsyncStorage.setItem('events', JSON.stringify(events));
    console.log('Event saved successfully!');
  } catch (error) {
    console.error('Failed to save event:', error);
  }
};

export const getEvents = async () => {
  try {
    const existingEvents = await AsyncStorage.getItem('events');
    return existingEvents ? JSON.parse(existingEvents) : {};
  } catch (error) {
    console.error('Failed to retrieve events:', error);
    return {};
  }
};

