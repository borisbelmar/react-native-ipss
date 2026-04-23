import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the home. {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
