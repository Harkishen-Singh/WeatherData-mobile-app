import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight } from 'react-native';
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
                    <Text style={[styles.textDefault, {color:'#fff'}]}>Administrator</Text>

                    <TextInput 
                        placeholder="User Name"
                        underlineColorAndroid='transparent'
                        autoCapitalize={false}
                        autoCorrect={false}
                        secureTextEntry={false}
                        style={styles.textDefaultInput}
                        
                    />
                    <TextInput
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        autoCapitalize={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={styles.textDefaultInput}
                    />
                    <TouchableHighlight style={styles.specButtons}>
                        <Text style={[styles.textDefault, {fontSize:15, textAlign:'center',paddingTop:7}]}>Login</Text>
                    </TouchableHighlight>

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
        alignItems:'center',
        backgroundColor: 'red',
        color:'#fff',
        height:null,
        width:null,
    },
    textDefaultInput: {
        marginTop:10,
        borderRadius:4,
        color:'#555',
        fontWeight:'bold',
        backgroundColor:'white',
        height:40,
        width:300,
        textAlign:'center',
    },
    buttonStyle:{
        backgroundColor:'white', marginTop:250,
        padding:10,paddingLeft:120,paddingRight:120,
        borderRadius:10,
    },
    textDefault:{
        color:'#555',
        fontSize:20,
        textAlign:'center',
        marginBottom:20,
    },
    specButtons : {
        backgroundColor:'#fff',
        color:'#555',
        width:150,
        marginTop:20,
        borderRadius:4,
        alignSelf:'center',
        height:40,
    }
});