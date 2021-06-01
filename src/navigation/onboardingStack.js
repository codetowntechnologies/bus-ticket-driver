import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './../screens/onboarding/login/login';
import ContactUs from './../screens/onboarding/contactUs/contactUs';
import ForgotPassword from './../screens/onboarding/forgotPassword/forgotPassword';
import OtpVerification from './../screens/onboarding/otpVerification/otpVerification';
import ResetPassword from './../screens/onboarding/resetPassword/resetPassword';
// import Tabbar from './tab/tabNav';

const Stack = createStackNavigator();

function onboardingStackStackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="contactUs" component={ContactUs} options={{headerShown: false}} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="otpVerification" component={OtpVerification} options={{headerShown: false}} />
        <Stack.Screen name="resetPassword" component={ResetPassword} options={{headerShown: false}} />
        {/* <Stack.Screen name="tabbar" component={Tabbar} options={{headerShown: false}} /> */}
      </Stack.Navigator>
  );
}

export default onboardingStackStackNavigator;