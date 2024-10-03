import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface StyledButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  color?: string;  // Optional color prop
  enabled?: boolean; // Optional prop to enable/disable the button
}

const StyledButton: React.FC<StyledButtonProps> = ({ onPress, title, color = '#4CAF50', enabled = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: enabled ? color : '#cccccc' } // Gray when disabled
      ]}
      onPress={enabled ? onPress : undefined} // Disable press when not enabled
      activeOpacity={enabled ? 0.7 : 1}      // No opacity change when disabled
    >
      <Text style={[styles.buttonText, { color: enabled ? '#fff' : '#888888' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StyledButton;
