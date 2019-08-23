import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Data from './local_Data';
import Toast from 'react-native-simple-toast';

const track_detail = [
    {
       "text":"Order has been completed",
       "date":"22/08/2019"
    },
    {
       "text":"Order reached pending payment",
       "date":"22/08/2019"
    },
    {
       "text":"Ordered successfully",
       "date":"20/08/2019"
    }
 ]

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            item: props.navigation.getParam('item')
        }
    }

    componentDidMount() {
        // this.setState({ isLoading: true });
    }

    componentWillReceiveProps(nextProps){
        this.setState({item:nextProps.navigation.getParam('item')})
    }

    renderItem = ({ item, index }) => (
        <Card containerStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <Text style={{ fontSize: 16, color: '#000' }}>{item.text}</Text>
            <Text>{item.date}</Text>
        </Card>
    )

    getItemName(items){
        var result = "";
        items.map((item,index)=>{
            result = result+(index+1)+". "+item.product_name + "\n";
        })
        return result;
    }

    render() {
        const {item} = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Card
                    containerStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text style={{ fontSize: 16, color: '#000' }}>{item.orderId}</Text>
                    <Text style={{ fontSize: 15, color: '#000' }}>Items {item.item_count}</Text>
                    <Text>Rs. {item.total}</Text>
                    <Text>Items {"\n"}{this.getItemName(item.items)}</Text>
                </Card>

                <Card image={require('./track_order.jpg')}/>

                <FlatList
                    data={track_detail}
                    renderItem={this.renderItem}
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