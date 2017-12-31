import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Picker } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null
        }
    }

    componentDidMount() {
        return fetch('https://developer.cumtd.com/api/v2.2/JSON/getstops?key=a2142759b9ac473e8dbdb95572546a7b')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.stops,
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
                <Picker
                    selectedValue={this.state.dataSource}>
                    {this.state.dataSource.map((item, key)=>(
                        <Picker.Item label={item.stop_name} value={item.stop_name} key={key} />)
                    )}
                </Picker>


            </View>
        );
    }
}
