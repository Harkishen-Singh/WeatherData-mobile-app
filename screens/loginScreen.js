import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight } from 'react-native';
import Display from 'react-native-display';

export class LoginScreenFirst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            pass:'',
            loginMainCheck: true,
            showMessageCheck:false,
            showMessage:'',
            loginSuccess:false,
        };
        this.loginOperations = this.loginOperations.bind(this);
    }
    render(){
        const {navigate} = this.props.navigation
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.appBackground}>
                <Display enable={this.state.showMessageCheck} >
                    <Text style={styles.messages}>{this.state.showMessage}</Text>
                </Display>

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
                        onChangeText={username => this.setState({username})}
                    />
                    <TextInput
                        placeholder='Password'
                        underlineColorAndroid='transparent'
                        autoCapitalize={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={styles.textDefaultInput}
                        onChangeText={pass => this.setState({pass})}
                    />
                    <Display enable={!this.state.loginSuccess} >
                        <TouchableHighlight style={styles.specButtons} onPress={this.loginOperations}>
                            <Text style={[styles.textDefault, {fontSize:15, textAlign:'center',paddingTop:7}]}>Login</Text>
                        </TouchableHighlight>
                    </Display>
                    <Display enable={this.state.loginSuccess}  >
                        <TouchableHighlight style={styles.specButtons} onPress={()=>{this.props.navigation.navigate('Options')}} >
                            <Text style={[styles.textDefault, {fontSize:15, textAlign:'center',paddingTop:7}]}>Next</Text>
                        </TouchableHighlight>
                    </Display>
                </Display>
         </View>
         </KeyboardAvoidingView>
         );
    }
    nextScreen = () => {
        
    }

    loginOperations() {
        let user = this.state.username, pass=this.state.pass;
        if(user.length==0 || pass.length==0){
            this.setState({showMessage:'Please fill both the fields.', showMessageCheck:true});
        }
        else{
            this.setState({showMessageCheck:false});
        fetch('http://192.168.43.51:5500/loginOperations', {
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
            this.setState({showMessage:'Succesfully Logged In. Welcome '+res['first_name']+' '+res['second_name'],
                showMessageCheck:true, loginSuccess:true
                });
        })
        .catch(err => {
            this.setState({showMessage:'Logged In Unsuccessful',
            showMessageCheck:true, loginSuccess:false
            });
        });
        }
    }
}


export var styles = StyleSheet.create({

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
    },
    messages:{
        color:'white',
        textAlign:'center',
        backgroundColor:'green',
        borderRadius:6,
        width:300,
        height:40,
        marginBottom:10,
        marginTop:10,
    }
});