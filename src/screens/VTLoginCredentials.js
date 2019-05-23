import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { viewportHeight, colors } from '../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
// import { postAuthToken } from '../redux/store';
import { Actions } from 'react-native-router-flux';

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    //postAuthToken: user => postAuthToken(user),
}

const passwordStrength = [
    {title:'Weak',color:'#ec0000',width:'33%'}, 
    {title:'Good',color:'#eba800',width:'66%'},
    {title:'Strong',color:'#7ee400',width:'100%'}
];

class VTLoginCredsScreen extends React.Component {
    
    // TODO, notification and permission for location and push notifications.

    state = {
        login_creds_email: this.props.user.email,
        login_creds_password: '',
        login_creds_passwordConfirm: ''
    };
    constructor (props) {
        super(props);
    }

    

    _tryUpdateLoginCreds(){
        
    }

    _updatePasswordStrength(){
        
        
    }

    render () {
        const { user, loading } = this.props;

        var level = 0;
        if(this.state.login_creds_password.length <= 3) {
            level = 0;
        } else if(this.state.login_creds_password.length <= 6) {
            level = 1;
        } else {
            level = 2;
        }

        return (
            <SafeAreaView style={[{flex:1}]}>
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <ScrollView style={[{height:viewportHeight}]}>
                        <View style={styles.containerInner}>
                            <Text style={[styles.title,{textAlign:'center'}]}>Login Credentials</Text>
                            <Text style={[{marginTop:15},{fontSize:15},{lineHeight:25}]}>Profile changes for Admins and Technician users are reviewed by Choice Home Warranty before taking effect.</Text>
                            
                            <View style={{marginTop:30}}>
                                <Text>Update Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => this.setState({login_creds_email: text})}
                                    value={user.email}
                                    placeholder={"Enter Email"}
                                />
                            </View>
                            
                            <View style={{marginTop:30}}>
                                <Text>Update New Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({login_creds_password: text})}
                                    value={this.state.login_creds_password}
                                    placeholder={"New Password"}
                                />
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({login_creds_passwordConfirm: text})}
                                    value={this.state.login_creds_passwordConfirm}
                                    placeholder={"Confirm New Password"}
                                />
                                {this.state.login_creds_password ? (
                                    <View style={[{marginTop:15},{alignItems:'flex-start'}]}>
                                        <Text>Strength: {passwordStrength[level].title}</Text>
                                        <View style={[{marginTop:5},{borderColor:passwordStrength[level].color},{borderWidth:3},{height:6},{borderRadius:6},{width:passwordStrength[level].width}]}></View>
                                    </View>
                                ) : ( null )}
                           </View>

                        </View>
                        <View style={[styles.containerInner, {flex:0},{textAlign:'center'}]}>
                            <PrimaryButton
                            onPress={() => this._tryUpdateLoginCreds()}
                            text="Save and Update"
                            enabled={this.state.login_creds_email != '' && this.state.login_creds_password != ''} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VTLoginCredsScreen);
