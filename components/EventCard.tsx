import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EventCardProps {
  event: string;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => (
  <View style={styles.card}>
    <Text style={styles.eventText}>{event}</Text>
    <TouchableOpacity onPress={onDelete}>
      <Icon name="delete" color="red" size={20} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
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

export default EventCard;
