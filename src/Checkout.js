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

export default class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            cartItem: [],
            total_price: 0
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.getCartItem();
    }

    getCartItem = async () => {
        var cartItem = JSON.parse(await AsyncStorage.getItem('cartItem'));
        if (cartItem) {
            var total = 0;
            cartItem.map(item => {
                total = total + parseFloat(item.product_price);
            })
            this.setState({ cartItem: cartItem, total_price: total, isLoading: false, refreshing: false });
        } else {
            this.setState({ cartItem: [], isLoading: false, refreshing: false });
        }
    }

    payAmount = async (cartItem, total_price) => {
        this.setState({ isLoading: true });
        var order = {
            orderId: new Date().getTime(),
            total: total_price,
            item_count: cartItem.length,
            items: cartItem
        }

        var orders = JSON.parse(await AsyncStorage.getItem('orders'));

        if (orders) {
            orders.push(order);
        } else {
            orders = [];
            orders.push(order);
        }

        console.log('orders', orders);
        await AsyncStorage.setItem('orders', JSON.stringify(orders), (error) => console.log(error));
        await AsyncStorage.removeItem('cartItem', (error) => console.log(error));
        this.setState({ isLoading: false });
        Toast.show('Order Created');
        this.props.navigation.navigate('History');

    }

    removeItem = async (item, index) => {
        this.setState({ isLoading: true });

        var cart_item = this.state.cartItem;
        cart_item.splice(index, 1);

        var total = 0;
        cart_item.map(product => {
                total = total + parseFloat(product.product_price);
            })

        await AsyncStorage.setItem('cartItem', JSON.stringify(cart_item), (error) => console.log(error));
        this.setState({ cartItem: cart_item, total_price: total, isLoading: false });
        Toast.show('Item remove');

    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getCartItem()
        });

    }

    renderItem = ({ item, index }) => (
        <ListItem
            title={item.product_name}
            subtitle={`Rs. ${item.product_price}`}
            leftAvatar={{ source: { uri: item.product_image_url } }}
            rightIcon={<Icon name='remove-shopping-cart' onPress={()=>this.removeItem(item,index)} />}
        />
    )

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.cartItem}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />

                {this.state.cartItem.length > 0 ?
                    <View style={{ flexDirection: 'row',padding:10, backgroundColor: '#fafafa', alignItems:'center'}}>
                        <Text style={{ flex: 1, fontSize: 18, color: '#000',marginLeft:10 }}>Total amount :</Text>
                        <Text style={{ fontSize: 18, color: '#000',marginRight:10 }}>{this.state.total_price}</Text>
                        <Button title=" Pay " onPress={()=>{this.payAmount(this.state.cartItem,this.state.total_price)}} />
                    </View>
                    : null}

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