import React, { Component } from 'react';
import { ActivityIndicator, View, Dimensions, ScrollView} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Right,
    Body,
    Left,
    Picker,
    Form,
    Footer,
    FooterTab,
    Text,
    List,
    ListItem,
} from "native-base";

const Item = Picker.Item;

export default class HomeScreen extends Component {

    /**
     * Hides the stack bar from showing up
     * @type {{header: null}}
     */
    static navigationOptions = {
        header: null,
    };

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
     * This function is run when the value of the selected stop is selected.
     * @param value Value selected.
     */
    onValueChange(value) {
        this.setState({
            selected1: value
        });
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
                    selected1: "key1",
                });
                this.getStops();
            },
        );
    };

    /**
     * This function takes the latitude and longitude values given in and inputs it into the mtd api and makes a GET
     * for all the stops nearest to the latitude and longitude given in.
     */
    getStops(){
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
                //errors
            });
    }

    /**
     * This function gets the bus' that come from the defined stop location.
     */
    getBus(){
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
                //errors
            });
    }

    /**
     * This runs when the app starts to load up the data on the stops.
     */
    componentDidMount() {
        this.getLocation();
    }

    /**
     * render menu.
     * This one actually loads up what we see.
     * @returns {*}
     */
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                 <Header>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosHeader="Stops"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Dimensions.get('window').width * .9}}
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.state.dataSource.map((item, key)=>(
                                    <Item label={item.stop_name} value={item.stop_name} key={key}/>))}
                            </Picker>
                        </Form>
                    </Content>
                </Header>

                <ScrollView>
                    <List>
                        {this.state.dataSource.map((item, key)=>(
                            <ListItem>
                                <Text>
                                    {item.stop_name}
                                </Text>
                            </ListItem>
                        ))}
                    </List>
                </ScrollView>
            </View>
    );
    }
}