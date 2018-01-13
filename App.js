import React, { Component } from 'react';
import { ActivityIndicator, View, Dimensions} from 'react-native';
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
} from "native-base";
import styles from "./styles";

const Item = Picker.Item;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            key: "f298fa4670de47f68a5630304e66227d",
            latitude: null,
            longitude: null,
            error: 2,
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        };
    }


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
                this.getAPI();
            },
        );
    };

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
                //errors
            });
    }


    componentDidMount() {
        this.getLocation();
    }


    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
    }
    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
    }
    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
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
            <Container style={styles.container}>

                <Header>
                    <Content>
                        <Form>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
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

                <Content padder />

                <Footer>
                    <FooterTab>
                        <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                            <Icon active={this.state.tab1} name="apps" />
                            <Text>Apps</Text>
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
                            <Icon active={this.state.tab2} name="camera" />
                            <Text>Camera</Text>
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
                            <Icon active={this.state.tab3} name="compass" />
                            <Text>Compass</Text>
                        </Button>
                        <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
                            <Icon active={this.state.tab4} name="contact" />
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>



            </Container>
        );
    }
}