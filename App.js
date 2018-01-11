import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Picker } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            key: "f298fa4670de47f68a5630304e66227d",
            latitude: null,
            longitude: null,
            error: 2
        };
    }


    /**
     * This function gets the current geo location of the device and stores it as Lat and Long coordinates.
     * @private
     */
    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                this.getAPI();
            },
        );
    }

    /**
     * This function takes the latitude and longitude values given in and inputs it into the mtd api and makes a GET
     * for all the stops nearest to the latitude and longitude given in.
     */
    getAPI(){
        fetch('https://developer.cumtd.com/api/v2.2/JSON/getstopsbylatlon?key='+this.state.key+'&lat='+this.state.latitude.toString()+'&lon='+this.state.longitude.toString())
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.stops,
                    isLoading: false,
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                //error
            });
    }


    componentDidMount() {
        this.getLocation();
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Picker
                    selectedValue={this.state.dataSource}>
                    {this.state.dataSource.map((item, key)=>(
                        <Picker.Item label={item.stop_name} value={item.stop_name} key={key}/>))}
                </Picker>
            </View>
        );
    }
}