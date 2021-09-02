import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="navigate PageA"
        onPress={() => navigation.navigate('PageA')}
      />
    </View>
  );
}

function PageA({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PageA screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="push PageB" onPress={() => navigation.push('PageB')} />
    </View>
  );
}

function PageB({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PageB screen</Text>
      <Button title="pop" onPress={() => navigation.pop()} />
      <Button title="popToTop Home" onPress={() => navigation.popToTop()} />
      <Button title="Replace with Replacer" onPress={() => navigation.replace('Replacer')} />
    </View>
  );
}

function Replacer({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Replacer screen</Text>
      <Button title="Replace with Home" onPress={() => navigation.replace('Home')} />
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
              transitionStart: (e) => {console.log("---->   [[["+JSON.stringify(e))+"]]]";} ,
              transitionEnd: (e) => {console.log("<----   [[["+JSON.stringify(e)+"]]]");} ,
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
        name="PageA"
        component={PageA}
        options={{ headerStyleInterpolator: forFade,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'green' },
        }}
      />
      <Stack.Screen
        name="PageB"
        component={PageB}
        options={{ headerStyleInterpolator: forFade ,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'blue' },
        }}
      />
      <Stack.Screen
        name="Replacer"
        component={Replacer}
        options={{ headerStyleInterpolator: forFade ,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'black' },
        }}
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
CardContainer::handleTransition --> onTransitionStart
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionStart]
useNavigationBuilder::useEventEmittertarget Home-EJgcNHbKBV0ogN9_hgesS route [object Object] [transitionStart]
{"type":"transitionStart","target":"Home-EJgcNHbKBV0ogN9_hgesS","data":{"closing":false}}

CardContainer::handleOpen
CardContainer::handleOpen --> onTransitionEnd
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionEnd]
useNavigationBuilder::useEventEmitter target Home-EJgcNHbKBV0ogN9_hgesS route [object Object] [transitionEnd]
{"type":"transitionEnd","target":"Home-EJgcNHbKBV0ogN9_hgesS","data":{"closing":false}}
*/

/*  navigation.navigate('PageA')  / navigation.push  / navigation.replace -->
Card::animate
CardContainer::handleTransition
CardContainer::handleTransition --> onTransitionStart
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionStart]
useNavigationBuilder::useEventEmitter target PageA-h21G69uRY5mVcErqK27k2 route undefined [transitionStart]
!!!!BUG!!!!

useEventEmitter::emit listenRef.current? undefined callbacks 0 [options]
useEventEmitter::emit listenRef.current? function callbacks undefined [blur]
useNavigationBuilder::useEventEmittertarget Home-EJgcNHbKBV0ogN9_hgesS route [object Object] [blur]
useEventEmitter::emit listenRef.current? function callbacks 1 [focus]
useNavigationBuilder::useEventEmittertarget PageA-h21G69uRY5mVcErqK27k2 route [object Object] [focus]
useEventEmitter::emit listenRef.current? function callbacks 0 [state]
useNavigationBuilder::useEventEmittertarget undefined route [object Object] [state]
useEventEmitter::emit listenRef.current? undefined callbacks 0 [state]

CardContainer::handleOpen
CardContainer::handleOpen --> onTransitionEnd
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionEnd]
useNavigationBuilder::useEventEmittertarget PageA-h21G69uRY5mVcErqK27k2 route [object Object] [transitionEnd]
{"type":"transitionEnd","target":"PageA-h21G69uRY5mVcErqK27k2","data":{"closing":false}}

*/

/*  navigation.goBack() / navigation.pop / navigation.popToTop()-->
Card::animate
CardContainer::handleTransition
CardContainer::handleTransition --> onTransitionStart
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionStart]
useNavigationBuilder::useEventEmittertarget PageA-h21G69uRY5mVcErqK27k2 route [object Object] [transitionStart]
{"type":"transitionStart","target":"PageA-h21G69uRY5mVcErqK27k2","data":{"closing":true}}
!!!!BUG!!!! <check target>

useEventEmitter::emit listenRef.current? undefined callbacks 0 [options]
useEventEmitter::emit listenRef.current? function callbacks undefined [blur]
useNavigationBuilder::useEventEmittertarget PageA-h21G69uRY5mVcErqK27k2 route undefined [blur]
useEventEmitter::emit listenRef.current? function callbacks 1 [focus]
useNavigationBuilder::useEventEmittertarget Home-EJgcNHbKBV0ogN9_hgesS route [object Object] [focus]
useEventEmitter::emit listenRef.current? function callbacks 0 [state]
useNavigationBuilder::useEventEmittertarget undefined route [object Object] [state]
useEventEmitter::emit listenRef.current? undefined callbacks 0 [state]

CardContainer::handleClose
CardContainer::handleClose --> onTransitionEnd
useEventEmitter::emit listenRef.current? function callbacks undefined [transitionEnd]
useNavigationBuilder::useEventEmittertarget PageA-h21G69uRY5mVcErqK27k2 route undefined [transitionEnd]
!!!!BUG!!!!

*/