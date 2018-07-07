import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {LoginScreenFirst} from './screens/loginScreen';
import Welcome from './screens/welcome';
import {Options} from './screens/options';
import {Website, PastWeather} from './screens/website_messages';

const AppStack = createStackNavigator({
    LoginScreenFirst: {
        screen: LoginScreenFirst,
        navigationOptions: {
          title: 'Get Started',
          header: null
        },
    },
    Welcome : {
        screen: Welcome,
        navigationOptions:{
            header:null,
            title:'Welcome'
        }
    },
    Options : {
        screen: Options,
        navigationOptions:{
            header:null,
            title:'Tasks'
        }
    },
    Website:{
        screen:Website,
        navigationOptions:{
            header:null,
            title:'Client_Messages'
        }
    },
    PastWeather: {
        screen:PastWeather,
        navigationOptions:{
            title:'VIewing past weather data from database',
            header:null
        }
    },
},
{
    initialRouteName:'Welcome'
}
);

export default AppStack;