import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';

import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { colors, viewportHeight } from '../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import store, { postPassword } from '../redux/store';
//import FlashMessage, { showMessage } from 'react-native-flash-message';


//Map the redux state to your props.
const mapStateToProps = state => ({
    resetemail: state.resetemail,
    loading: state.loading,
    messageResetPassword: state.messageResetPassword,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    postPassword: email => postPassword(email),
}

class ResetPasswordScreen extends React.Component {

    state = {
        resetemail: this.props.email,
    };

    componentDidMount() {

    }
    
    _resetPassword() {
        const email = { email : this.state.resetemail };
        console.log('sending reset email for ', email);
        this.props.postPassword(email);
    }

    _showMessage(messageOptions) {
        setTimeout(() => {
            showMessage(messageOptions);
        }, 200);

        return (
            <FlashMessage ref={'resetpassword'} position="top" />
        );
    }

    render () {
        const { loading, messageResetPassword } = this.props;

        return (
            <SafeAreaView>
                <View>
                    <StatusBar
                    translucent={false}
                    backgroundColor={'rgba(0, 0, 0, 0.3)'}
                    barStyle={'light-content'}
                    />
                    
                    <View>
                        <LinearGradient colors={[colors.white, colors.chwGradientBlue]} style={[{height:viewportHeight}]} >
                            <View style={styles.containerInner}>
                                <Text style={styles.smallTitle}>Reset Your Password</Text>
                                <Text>Please enter your email address. You will receive a link to create a new password via email.</Text>
                                <TextInput
                                     style={[styles.textInput,styles.textInputShadow,{marginVertical:25}]}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => this.setState({resetemail:text})}
                                    value={this.state.resetemail}
                                    placeholder={"Enter Email Address"}
                                />
                            </View>
                            <View style={[styles.containerInner, {flex:0},{textAlign:'center'},{marginBottom:25}]}>
                                <PrimaryButton
                                onPress={() => this._resetPassword()}
                                text="Request New Password"
                                enabled={this.state.resetemail != ''} />
                            </View>
                        </LinearGradient>
                    </View>  
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
