import React from 'react';
import { View, Text, ImageBackground, StyleSheet,KeyboardAvoidingView,TextInput, TouchableHighlight, ListView, ScrollView,Button } from 'react-native';
import Display from 'react-native-display';
import {styles} from './loginScreen';
import DatePicker from 'react-native-datepicker';

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
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        this.state={
            date:'',
            place:'',
            datasource: ds.cloneWithRows()
        };

        this.searchRecord=this.searchRecord.bind(this);
    }

    searchRecord() {
        fetch('http://192.168.43.51:5500/fetchPastWeather', {
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                'date':this.state.date,
                'place':this.state.place
            })
        })
        .then(resData=> resData.json())
        .then(res => {
            alert('Works');
            console.warn(res);

        })
        .catch(err => {
            alert('err occuered');
            this.setState({ds:this.state.datasource.cloneWithRows(res)});
        });
    
    }    

    render(){
        

        return (
            <View style={styles.container} >
                <Text style={[styles.textDefault, {color:'white',marginTop:20}]} >Mining Past Weather</Text>
                <ScrollView>
                <TextInput
                    placeholder='Enter Place'
                    style={styles.textDefaultInput}
                    onChangeText={ place => this.setState({place})}
                    underlineColorAndroid='transparent'
                    />
                <DatePicker
                    placeholder='Enter Date'
                    mode='date'
                    style={{marginTop:10}}
                    onDateChange={(date)=>{this.setState({date});
                                            console.warn(this.state.date);
                                        }}
                    />
                <TouchableHighlight 
                    onPress={this.searchRecord}
                    style={{backgroundColor:'white',borderRadius:10,marginTop:10, height:40, width:150}}

                >
                    <Text style={{color:'#555',textAlign:'center',paddingTop:10}}>Search</Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.datasource}
                    renderRow={data =>
                    <View>
                        <Text >Place : {data.place} </Text>
                    </View>
                    }
                />

                </ScrollView>
            </View>

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