import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import { Day } from '../types/calendarTypes';
import { convertToMonth } from '@/app/utils/utils';

interface DayItemProps {
  day: Day;
  events: string[];
  onPress: () => void;
  onDeleteEvent: (index: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({ day, events, onPress, onDeleteEvent }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.dateText}>{`${day.day}/${convertToMonth(day.month)}`}</Text>
      <Text style={styles.weekdayText}>{day.weekday}</Text>
      {events.map((event, index) => (
        <EventCard key={index} event={event} onDelete={() => onDeleteEvent(index)} />
      ))}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    // styles for the container
  },
  dateText: {
    fontWeight: 'bold',
  },
  weekdayText: {
    color: 'gray',
  },
});

export default DayItem;
