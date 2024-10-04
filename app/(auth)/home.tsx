/**
 * Calendar Page Component
 * 
 * This component displays a calendar interface where users can view events 
 * for each day of the week. Users can add new events through a modal interface, 
 * and events can be deleted. The calendar data is sourced from a JSON file.
 * 
 * Author: Nirvik
 * Date: 2024-10-04
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, StyleSheet } from 'react-native';
import calendarData from '../../assets/calendar.json';
import { convertToMonth } from '../utils/utils';
import StyledButton from '@/components/StyledButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CalendarData, Day, Week } from '@/types/calendarTypes';


const Page: React.FC = () => {
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number } | null>(null);
  const [newEvent, setNewEvent] = useState('');



  useEffect(() => {
    const initialEvents: Record<string, string[]> = {};

    (calendarData as CalendarData).calendar.forEach(week => {
      week.days.forEach(day => {
        const dateKey = `${day.day}-${day.month}`;
        initialEvents[dateKey] = day.event ? [day.event] : [];
      });
    });

    setEvents(initialEvents);
  }, []);




  const handleDayPress = (day: number, month: number) => {
    setSelectedDate({ day, month });
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      const dateKey = `${selectedDate.day}-${selectedDate.month}`;
      setEvents(prev => ({
        ...prev,
        [dateKey]: prev[dateKey] ? [...prev[dateKey], newEvent] : [newEvent],
      }));
      setNewEvent('');
      setModalVisible(false);
    }
  };


  const renderDay = ({ item }: { item: Day }) => {
    const { day, month, weekday } = item;
    const dateKey = `${day}-${month}`;
    const dayEvents = events[dateKey] || [];

    const handleDeleteEvent = (eventIndex: number) => {
      setEvents(prevEvents => {
        const updatedEvents = { ...prevEvents };
        updatedEvents[dateKey] = updatedEvents[dateKey].filter((_, index) => index !== eventIndex);
        return updatedEvents;
      });
    };

    return (
      <TouchableOpacity onPress={() => handleDayPress(day, month)}>
        <View style={styles.dayContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.dateText}>{`${day}/${convertToMonth(month)}`}</Text>
            <Text style={styles.weekdayText}>{weekday}</Text>
          </View>

          <View style={styles.rightContainer}>
            {dayEvents.length > 0 && dayEvents.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                <Text style={styles.eventText}>{event}</Text>
                <TouchableOpacity onPress={() => handleDeleteEvent(index)}>
                  <Icon name='delete' color="red" size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const renderWeek = ({ item }: { item: Week }) => (
    <View>
      <Text style={styles.weekTitle}>Week {item.week}</Text>
      <FlatList
        data={item.days}
        renderItem={renderDay}
        keyExtractor={day => `${day.day}-${day.month}`}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={(calendarData as CalendarData).calendar}
        renderItem={renderWeek}
        keyExtractor={week => week.week.toString()}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ alignSelf: "center", fontWeight: "bold", padding: 5 }}>{selectedDate?.day} {convertToMonth(selectedDate?.month as number)}</Text>
            <TextInput
              placeholder="Event Description"
              value={newEvent}
              onChangeText={setNewEvent}
              style={styles.input}
            />
            <StyledButton title="Add Event" onPress={handleAddEvent} />
            <StyledButton title="Cancel" onPress={() => setModalVisible(false)} color='red' />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  weekTitle: {
    fontWeight: 'bold',
    marginVertical: 30,
    alignSelf: "center"
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
  dateText: {
    fontWeight: 'bold',
  },
  weekdayText: {
    color: 'gray',
  },

  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginVertical: 5,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventText: {
    color: 'blue',
    flex: 1,
  },

});

export default Page;
