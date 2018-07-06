import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput } from 'react-native';
import Display from 'react-native-display';

export default class LoginScreenFirst extends React.Component {
    render(){
        const {nagivate} = this.props.navigation
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.appBackground}>
                <Display 
                    enable={this.state.loginMainCheck}
                    >
                    <TextInput 
                        placeholder="User Name"
                        style={styles.textDefault}
                    />
                    <TextInput
                        placeholder='Password'
                        style={styles.textDefault}
                    />

                </Display>
         </View>
         </KeyboardAvoidingView>
         );
    }
    constructor(props) {
        super(props);
        this.state = {
            loginMainCheck: true,
        };
    }
}


var styles = StyleSheet.create({

    appBackground: {
        backgroundColor: 'red',
        color:'#fff',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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