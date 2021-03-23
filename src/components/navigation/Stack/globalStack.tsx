import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Weather, WeatherDetails} from '../../../features/Weather';

export type RootStackParamList = {
  Weather: undefined;
  WeatherDetails: any;
};

const Stack = createStackNavigator<RootStackParamList>();
const options = {
  animationEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

export const Routes = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
        cardStyle: {backgroundColor: 'transparent'},
      }}
      initialRouteName="Weather">
      <Stack.Screen name="Weather" component={Weather} />
      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={options}
      />
    </Stack.Navigator>
  );
};
