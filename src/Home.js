import React from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Data from './local_Data';
import Toast from 'react-native-simple-toast';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            products: [],
            order: props.navigation.getParam('order') || true
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.getProduct()
    }

    componentWillReceiveProps(nextProps){
        this.setState({order:nextProps.navigation.getParam('order')},()=>{
            this._onRefresh()
        })
    }

    getProduct = async () => {
        setTimeout(() => {
            if(this.state.order){
                this.getAscProductByAmount(Data.products);
            }else{
                this.getDescProductByAmount(Data.products);
            }
            // this.setState({ products: Data.products, refreshing: false, isLoading: false })
        }, 2000);
    }

    getAscProductByAmount(product){
        var result = product.sort((a,b)=>{
            var a1 = parseInt(a.product_price);
            var b1 = parseInt(b.product_price);
            return a1-b1;
        });
        this.setState({ products: result, refreshing: false, isLoading: false })
    }

    getDescProductByAmount(product){
        var result = product.sort((a,b)=>{
            var a1 = parseInt(a.product_price);
            var b1 = parseInt(b.product_price);
            return b1-a1;
        });
        this.setState({ products: result, refreshing: false, isLoading: false })
    }

    addToCart = async(item) =>{
        this.setState({isLoading:true});
        var cart_item = JSON.parse(await AsyncStorage.getItem('cartItem'));
        if(cart_item){
            cart_item.push(item);
        }else{
            cart_item = [];
            cart_item.push(item);
        }
        console.log('cart_item',cart_item);
        await AsyncStorage.setItem('cartItem',JSON.stringify(cart_item),(error)=>console.log(error));
        this.setState({isLoading:false});
        Toast.show('Added to cart');
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getProduct()
        });

    }

    renderItem = ({ item, index }) => (
        <Card
            title={<View style={{alignItems:'flex-end',padding:10}}>
                <Icon name="add-shopping-cart" style={{padding:10}} onPress={()=>{
                    this.addToCart(item)
                }} />
            </View>}
            image={{ uri: item.product_image_url }}
            containerStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OrderDetail',{item:item})}}> */}
            <Text style={{ fontSize: 16, color: '#000' }}>{item.product_name}</Text>
            <Text>Rs. {item.product_price}</Text>
            {/* </TouchableOpacity> */}
        </Card>
    )

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.products}
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