import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight, ListView } from 'react-native';
import Display from 'react-native-display';
import {styles} from './loginScreen';

export default class Website extends React.Component {
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
                <Text style={[styles.textDefault, {color:'#fff', fontWeight:'bold', textAlign:'center'}]}>Client Messages</Text>
            </View>
            <ListView
                dataSource={this.state.datasource}
                renderRow={ data => 
                    <View style={{flexDirection:'column'}} >
                        <Text>IP : {data.ip} </Text>
                        <Text>Name : {data.name} </Text>
                        <Text>Time :{ data.time} </Text>
                        <Text>Work Type : {data.work_type} </Text>
                        <Text>Phone : {data.phone} </Text>
                        <Text>Message : {data.message} </Text>
                        <Text>Email : {data.email}  </Text>
                    </View>
                 }
                />
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