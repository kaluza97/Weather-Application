/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DetailsScreen from '@screens/Details/screen';
import HomeScreen from '@screens/Home/screen';
import {RootStackParamList} from '@screens/Details/types';
import CustomHeader from '@components/CustomHeader/component';
import {colors} from '@constants/global.styles';

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
                    headerStyle: {backgroundColor: colors.black},
                  }}
                />
                <Stack.Screen
                  name="Details"
                  component={DetailsScreen}
                  options={{
                    headerTitle: () => <CustomHeader title="" />,
                    headerStyle: {backgroundColor: colors.primaryColor},
                    headerTintColor: colors.white,
                  }}
                />
              </>
            }></Stack.Navigator>
        }></NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
