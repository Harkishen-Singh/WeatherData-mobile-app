import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStack from './router';
 
class App extends React.Component {
  render() {
    return (
        <AppStack />
    );
  }
}
console.disableYellowBox=true;

export default  App;