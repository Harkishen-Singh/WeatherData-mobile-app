import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight, ListView, ScrollView } from 'react-native';
import Display from 'react-native-display';
import {styles} from './loginScreen';

export  class Website extends React.Component {
    constructor(props) {
        super(props);
        const ds= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            datasource : ds.cloneWithRows(['Client', 'Messages']),
        }
    
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}>
            <View style={styles.appBackground} >
                <Text style={[styles.textDefault, {color:'#fff', fontWeight:'bold', textAlign:'center', marginTop:20}]}>Client Messages</Text>
            </View>
            <ScrollView>
            <ListView
                dataSource={this.state.datasource}
                renderRow={ data => 
                    <View style={{flexDirection:'column'}} >

                        <Text style={{color:'#fff', fontWeight:'bold'}} >Phone : {data.phone} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>IP : {data.ip} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Name : {data.name} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Time :{ data.time} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Work Type : {data.work_type} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Message : {data.message} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Email : {data.email} </Text>
                        <Text>{'\n'} </Text>
                    </View>
                 }
                />
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    componentWillMount(){
        console.debug('reached website');
        fetch('http://192.168.43.51:5500/fetchClientMessages', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST'
        })
        .then(resData => resData.json())
        .then(res => {
            console.debug(res);
            this.setState({ datasource: this.state.datasource.cloneWithRows(res) })
        })
        .catch(err => alert('err while retriving Client_Messages'));
    }

}

export class PastWeather extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View></View>
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