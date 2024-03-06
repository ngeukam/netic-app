import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNotifications from './scr/components/Notifications';
import Home from './scr/screens/Home';
import AppNavigation from './scr/navigation/AppNavigation';

export default function App() {
  return (
    <AppNavigation/>
    // <View style={styles.container}>
     
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
