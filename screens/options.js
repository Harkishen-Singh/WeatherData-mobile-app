import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight, ListView } from 'react-native';
import Display from 'react-native-display';
import {styles} from './loginScreen';

export class Options extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableHighlight  style={selfStyles.button} onPress={() => {this.props.navigation.navigate('Website');}} >
                    <Text style={[styles.textDefault, {fontSize:15,paddingTop:7}]} >Website Messages</Text>
                </TouchableHighlight>
                <TouchableHighlight style={selfStyles.button} onPress={()=> {this.props.navigation.navigate('PastWeather');} } >
                    <Text style={[styles.textDefault, {fontSize:15,paddingTop:7}]} >Past Weather Data</Text>
                </TouchableHighlight>
                <TouchableHighlight  style={selfStyles.button}>
                    <Text style={[styles.textDefault, {fontSize:15,paddingTop:7}]} >Cities List</Text>
                </TouchableHighlight>
                <TouchableHighlight  style={selfStyles.button}>
                    <Text style={[styles.textDefault, {fontSize:15,paddingTop:7}]} >Total Record List</Text>
                </TouchableHighlight>

            </KeyboardAvoidingView>
        );

    }
}



 

const selfStyles = StyleSheet.create({
    button:{
        backgroundColor:'#fff',
        color:'#555',
        height:40,
        textAlign:'center',
        width:300,
        borderRadius:10,
        marginTop:10,
    }
});
