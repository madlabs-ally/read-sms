import * as React from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserData from './components/UserData';

const Stack = createNativeStackNavigator();
// Create a constant with users we have created accounts for.
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top' }}>
      <Text>SMS Record - Home</Text>
      <List.Item
        title="Mwiza Simbeye"
        description="13 Messages"
        left={props => <List.Icon {...props} icon="message" />}
        onPress={() =>
          navigation.navigate('Person', {username: 'Madlabs173'})
        }
      />
       <List.Item
        title="Mwiza Simbeye"
        description="13 Messages"
        left={props => <List.Icon {...props} icon="message" />}
        onPress={() =>
          navigation.navigate('Person', {username: 'Madalitso'})
        }
      />
    </View>
  );
}

const PersonScreen = ({navigation, route}) => {
  return <UserData route={route}/>;
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;