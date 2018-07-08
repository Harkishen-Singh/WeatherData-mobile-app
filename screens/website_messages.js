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
            displayResult:false,
            weatherEntry:true,
            datasource: ds.cloneWithRows(['Something']),
            showMessage:false,
            message:'',
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
            console.warn(res);
            if(res.length==0){
                this.setState({showMessage:true,message:'   Record Not Found   '})
            }
            else
                this.setState({datasource:this.state.datasource.cloneWithRows(res), displayResult:true, weatherEntry:false, showMessage:false});
            
        })
        .catch(err => {
            
            this.setState({showMessage:true,message:'Record not Found.'})
        });
    
    }    

    render(){
        return (
            <View style={styles.container} >
                <Text style={[styles.textDefault, {color:'white',marginTop:20}]} >Mining Past Weather</Text>
                <Display enable={this.state.showMessage}>
                    <Text style={[styles.textDefault, {color:'white',marginTop:10, backgroundColor:'green', borderRadius:10 }]}> {this.state.message} </Text>
                </Display>
                <Display enable={this.state.weatherEntry} >
                <TextInput
                    placeholder='Enter Place'
                    style={styles.textDefaultInput}
                    onChangeText={ place => this.setState({place})}
                    underlineColorAndroid='transparent'
                    />
                <Display enable={()=>{
                    if(this.state.date.length == 0)
                        return false;
                    else
                        return true;

                }}>
                    <Text style={[styles.textDefault, {color:'white',marginTop:10, fontSize:15, textAlign:'center'}]}>Date : {this.state.date} </Text>
                </Display>
                <DatePicker
                    placeholder='Enter Date'
                    mode='date'
                    style={{marginTop:10, alignSelf:'center', textAlign:'center'}}
                    onDateChange={(date)=>{this.setState({date});
                                            console.warn(this.state.date);
                                        }}
                    />
                    
                <TouchableHighlight 
                    onPress={this.searchRecord}
                    style={{backgroundColor:'white',borderRadius:10,marginTop:30, height:40, width:150, alignSelf:'center'}}

                >
                    <Text style={{color:'#555',textAlign:'center',paddingTop:10}}>Search</Text>
                </TouchableHighlight>
                </Display>
                <ScrollView>
                <Display
                    enable={this.state.displayResult}
                    >
                <TouchableHighlight 
                    onPress={()=>{ 
                        this.setState({weatherEntry:true, displayResult:false}) 
                                        
                    }}
                    style={{backgroundColor:'white',borderRadius:10,marginTop:10, height:40, width:150}}

                >
                    <Text style={{color:'#555',textAlign:'center',paddingTop:10, alignSelf:'center'}}>Another Search</Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.datasource}
                    renderRow={data2 =>
                    <View style={{flexDirection:'column'}} >
                        <Text style={{color:'white', marginLeft:10}}>Mongo ID : {data2._id}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Date : {data2.date}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Time at server storage ( NOW ) : {data2.time_now}</Text>
                        <Text style={{color:'white', marginLeft:10}}>City : {data2.city}</Text>
                        <Text style={{color:'white', marginLeft:10}}>State : {data2.state}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Place : {data2.place}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Feels Like : {data2.feels_like_that_moment}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Present Temperature : {data2.temperature_that_moment}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Average Temperature : {data2.avg_temperature}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Max Temperature : {data2.max_temperature}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Min Temperature : {data2.min_temperature}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Max Rain Probability : {data2.max_probability_rainfall}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Avg Rain Probability : {data2.avg_rainfall}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Min Rain Probability : {data2.min_probability_rainfall}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Visibility : {data2.visibility}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Humidity : {data2.humidity}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Dew Point : {data2.dew_point}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Hourly Forecast : {data2.hourly_forecast}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Rain array starting from now : {data2.rain_array_starting_from_time_now}</Text>
                        <Text style={{color:'white', marginLeft:10}}>Temp Array starting from now : {data2.temp_array_starting_from_time_now}</Text>

                    </View>
                    }
                />
                </Display>
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