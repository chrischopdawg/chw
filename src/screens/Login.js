import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, CheckBox, Platform } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { colors, viewportHeight } from '../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import store, { postAuthToken } from '../redux/store';
import { Actions } from 'react-native-router-flux';


import FlashMessage, { showMessage } from 'react-native-flash-message';
//import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'

//Map the redux state to your props.
const mapStateToProps = state => ({
    auth: state.auth,
    messageLogin: state.messageLogin,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    postAuthToken: user => postAuthToken(user),
}



class LoginScreen extends React.Component {
    
    // TODO, notification and permission for location and push notifications.

    static navigationOptions = {
        header: null
      }
    state = {
        modalVisible: false,
        email: '',
        password: '',
        rememberme: true,
    };
    constructor (props) {
        super(props);
    }

    _forgotPassword() {
        Actions.resetpassword({email:this.state.email});
    }

    _tryLogin(){
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.postAuthToken(user);
    }

    _showMessage(messageOptions) {
        console.log('show a message ', messageOptions);
        
        setTimeout(() => {
            console.log('timer bang');
            showMessage(messageOptions);
        }, 200);

        return (
            <FlashMessage ref={'login'} position="top" />
        );
    }

    render () {
        const { auth, loading, messageLogin } = this.props;

        return (
            <SafeAreaView >
                
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <View>
                        <LinearGradient colors={[colors.white, colors.chwGradientBlue]} style={[{height:viewportHeight}]} >
                            <View style={[styles.logoContainer]}>
                                <Image resizeMode="contain" source={require('../../assets/images/logo.png')} style={styles.logoSmall}/>
                            </View>
                            <View style={styles.containerInner}>
                                <Text style={[styles.title,{textAlign:'center'}]}>Login</Text>
                                <TextInput
                                    style={[styles.textInput,styles.textInputShadow]}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    placeholder={"Enter Email Address"}
                                />
                                <TextInput
                                    style={[styles.textInput,styles.textInputShadow]}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    placeholder={"Enter Password"}
                                />

                                <View style={[{flexDirection:'row'},{alignContent:'center'},{marginVertical:25}]}>
                                        <CheckBox
                                            style={[styles.checkbox,{marginLeft:100},{marginRight:10}]} 
                                            textStyle={styles.text}
                                            onClick={()=>{ this.setState({ rememberme: !this.state.rememberme }) }}
                                            isChecked={this.state.rememberme}
                                            title={"Remember me"}
                                        />
                                        <Text style={[{flex:1}]}>Remember Me</Text>
                                  
                                </View>
                                
                            </View>
                            <View style={[styles.containerInner, {flex:0},{textAlign:'center'}]}>
                                <Text style={[styles.text,{textAlign:'center'}]} onPress={() => this._forgotPassword() }>Forgot your password?</Text>
                                <PrimaryButton
                                onPress={() => this._tryLogin()}
                                text="Login"
                                enabled={this.state.email != '' && this.state.password != ''} />
                            </View>
                        </LinearGradient>
                    </View>
                </View> 
                {!loading && messageLogin ? 
                 ( this._showMessage(messageLogin) )
                 : ( null ) }
                
               
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
