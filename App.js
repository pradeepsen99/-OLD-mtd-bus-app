import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Picker } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            key: "f298fa4670de47f68a5630304e66227d",
            latitude: 89.7,
            longitude: 89.7,
            error: 2
        };
    }


    /**
     * This function gets the current geo location of the device and stores it
     * as Lat and Long coordinates.
     * @private
     */
    getLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) =>
                this.setState({ error: error.message, latitude: 41.77, longitude: -88.07,}),
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 },
        );
    }

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
        this.getAPI();
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
