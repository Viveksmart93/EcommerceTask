import React from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import Data from './local_Data';
import Toast from 'react-native-simple-toast';

export default class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            Orders: [],
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.getOrders();
    }

    getOrders = async () => {
        var orders = JSON.parse(await AsyncStorage.getItem('orders'));
        if (orders) {
            this.setState({ Orders: orders, isLoading: false, refreshing: false });
        } else {
            this.setState({ Orders: [], isLoading: false, refreshing: false });
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getOrders()
        });

    }

    renderItem = ({ item, index }) => (
        <ListItem
            title={item.orderId}
            subtitle={<View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{flex:1}}>Items {item.item_count}</Text>
                <Text>Total : {item.total}</Text>
            </View>}
        />
    )

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.Orders}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />

                {this.state.isLoading ?
                    <View style={{
                        flex: 1, elevation: 2, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center', position: 'absolute', width: '100%', height: '100%'
                    }}>
                        <ActivityIndicator color={"white"} size='large' />
                        <Text style={{ color: "white", marginTop: 10 }}>{"Please Wait...!"}</Text>
                    </View>
                    : null}
            </View>
        )
    }
}