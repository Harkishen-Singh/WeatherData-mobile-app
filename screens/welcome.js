import React from 'react';
import Display from 'react-native-display';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class Welcome extends React.Component {
    
    render() {
        const {navigate} = this.props.navigation;
        return (
        <View style={styles.appBackground} >
            <Text style={styles.textDefault}>
                WeatherData.in
            </Text>
            <Text style={styles.textDefault}>
                Welcome Administrator
            </Text>
            <TouchableHighlight onPress={()=>{ this.props.navigation.navigate('LoginScreenFirst');  }} style={styles.buttonStyle}>
                <Text style={{color:'#555', fontWeight:'300'}}> NEXT </Text>
            </TouchableHighlight>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		width:null,
        height:null,
        alignItems:'center',
	},
    appBackground:{
        backgroundColor:'red',
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    textDefault: {
        color:'white',
        fontWeight:'bold'
    },
    buttonStyle:{
        backgroundColor:'white', marginTop:250,
        padding:10,paddingLeft:120,paddingRight:120,
        borderRadius:10,
    }
});