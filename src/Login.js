import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
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

    validateUser(username) {
        return 
    }

    validatePassword(password) {

    }

    onSubmit = () => {
        this.setState({
            isMobileValid: this.validateMobile(this.state.mobile) || this.mobileInput.shake()
        }, () => {
            if (this.state.isMobileValid) {
                this.setState({ isLoading: true });
                this.userSendOtp();
            }
        })
    }

    userSendOtp = () => {
        var url = `http://jinnyhouse.in/api/User_SendOTP?Mobile=${this.state.mobile}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false });
                if (responseJson.IsSuccess) {
                    Toast.show(responseJson.Message, Toast.SHORT);
                    this.setState = ({ mobile: '' });
                    this.props.navigation.navigate('LoginOtp', { data: responseJson.Data, mobile: this.state.mobile });
                } else {
                    Toast.show(responseJson.Message, Toast.SHORT);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.error(error);
                Toast.show(error, Toast.LONG);
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>

                        <Input
                            ref={input => this.mobileInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10, marginBottom: 10 }}
                            placeholder="Mobile" placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            keyboardType='phone-pad'
                            onChangeText={(text) => { this.setState({ mobile: text }) }}
                            errorMessage={this.state.isUserValid ? null : 'Please enter valid user name'}
                        />

                        <Input
                            ref={input => this.mobileInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10, marginBottom: 10 }}
                            placeholder="Password" 
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ mobile: text }) }}
                            errorMessage={this.state.isPasswordValid ? null : 'Please enter valid password'}
                        />

                        <Button
                            containerStyle={{ marginTop: 25, marginBottom: 25, width: "80%" }}
                            buttonStyle={{ height: 50, borderRadius: 25, backgroundColor: Colors.themeColor }}
                            title="LOGIN"
                            loading={this.state.isLoading}
                            onPress={() => { this.onSubmit() }} />

                    </View>
                </ScrollView>

            </View>
        );
    }

}