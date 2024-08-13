/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import HomeScreen from './screens/Home/screen';
import DetailsScreen from './screens/Details/screen';
import CustomHeader from './components/CustomHeader/component';
import {black, primaryColor, white} from './variables/global.styles';
import {RootStackParamList} from './screens/Details/types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer
        children={
          <Stack.Navigator
            initialRouteName="Home"
            children={
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerTitle: () => <CustomHeader title="Pogoda" />,
                    headerStyle: {backgroundColor: black},
                  }}
                />
                <Stack.Screen
                  name="Details"
                  component={DetailsScreen}
                  options={{
                    headerTitle: () => <CustomHeader title="" />,
                    headerStyle: {backgroundColor: primaryColor},
                    headerTintColor: white,
                  }}
                />
              </>
            }></Stack.Navigator>
        }></NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
