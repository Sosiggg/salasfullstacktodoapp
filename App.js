import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <TodoList darkMode={darkMode} toggleTheme={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
});
