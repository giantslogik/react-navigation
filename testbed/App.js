import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenListeners={({ navigation, route }) => ({
              transitionStart: (e) => {console.log(JSON.stringify(e));} ,
              transitionEnd: (e) => {console.log(JSON.stringify(e));} ,
            })}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

/* Desired transitionStart/transitionEnd Behaviour -->
The navigator can emit events on certain actions. Supported events are:

transitionStart#
This event is fired when the transition animation starts for the current screen.

transitionEnd#
This event is fired when the transition animation ends for the current screen.
*/

/* Startup -->
Card::animate

CardContainer::handleTransition

{"type":"transitionStart","target":"Home-ELymICNk-KylbdmYc2n0f","data":{"closing":false}}

CardContainer::handleOpen

{"type":"transitionEnd","target":"Home-ELymICNk-KylbdmYc2n0f","data":{"closing":false}}
*/