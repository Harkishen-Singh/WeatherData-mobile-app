import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight } from 'react-native';
import Display from 'react-native-display';

export default class LoginScreenFirst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            pass:'',
            loginMainCheck: true,
        };
        this.loginOperations = this.loginOperations.bind(this);
    }
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
                        onChangeText={username => this.setState(username)}
                    />
                    <TextInput
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        autoCapitalize={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={styles.textDefaultInput}
                        onChangeText={pass => this.setState(pass)}
                    />
                    <TouchableHighlight style={styles.specButtons}>
                        <Text style={[styles.textDefault, {fontSize:15, textAlign:'center',paddingTop:7}]}>Login</Text>
                    </TouchableHighlight>

                </Display>
         </View>
         </KeyboardAvoidingView>
         );
    }
    loginOperations() {
        let user = this.state.username, pass=this.state.pass;
        fetch('http://192.168.225.44:5000/loginOperations', {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username':user,
                'password':pass,
            }),
        })
        .then(resData => resData.json())
        .then(res => {
            console.warn('Received as '+res);
        })
        .catch(err => {
            alert('Error while connecting with Node server');
        });
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