import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Data from './local_Data';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isUserValid: true,
            isPasswordValid: true,
            isLoading: false
        }
    }

    async componentWillMount(){
        var isLogin = await AsyncStorage.getItem('isLogin');
        if(isLogin){
            this.props.navigation.navigate('App');
        }
    }

    validateUser(username) {
        // return Data.userInfo.user_name === username;
        return true;
    }

    validatePassword(password) {
        // return Data.userInfo.password === password;
        return true;
    }

    onSubmit = () => {
        this.setState({isLoading:true});
        setTimeout(()=>{
            this.setState({
                isUserValid: this.validateUser(this.state.username) || this.userInput.shake(),
                isPasswordValid: this.validatePassword(this.state.password) || this.passwordInput.shake()
            }, async() => {
                // if(this.state.isUserValid && this.state.isPasswordValid){
                    await AsyncStorage.setItem('isLogin',true);
                    this.props.navigation.navigate('App');
                // }
                this.setState({isLoading:false});
            })
        },2000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>

                        <Input
                            ref={input => this.userInput = input}
                            containerStyle={{ width: '85%', marginTop: 10, marginBottom: 10 }}
                            placeholder="Mobile" 
                            onChangeText={(text) => { this.setState({ username: text }) }}
                            errorMessage={this.state.isUserValid ? null : 'Please enter valid user name'}
                        />

                        <Input
                            ref={input => this.passwordInput = input}
                            containerStyle={{ width: '85%', marginTop: 10, marginBottom: 10 }}
                            placeholder="Password" 
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            errorMessage={this.state.isPasswordValid ? null : 'Please enter valid password'}
                        />

                        <Button
                            containerStyle={{ marginTop: 25, marginBottom: 25, width: "80%" }}
                            buttonStyle={{ height: 50, borderRadius: 25}}
                            title="LOGIN"
                            disabled={this.state.isLoading}
                            loading={this.state.isLoading}
                            onPress={() => { this.onSubmit() }} />

                    </View>
                </ScrollView>

            </View>
        );
    }
 
}