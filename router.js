import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreenFirst from './screens/loginScreen';
import Welcome from './screens/welcome';

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
},
{
    initialRouteName:'Welcome'
}
);

export default AppStack;