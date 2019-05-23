import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { viewportHeight } from '../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
//import { postAuthToken } from '../redux/store';
import { Actions } from 'react-native-router-flux';

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    // postAuthToken: user => postAuthToken(user),
}

class VTProfileInfoScreen extends React.Component {
    
    // TODO, notification and permission for location and push notifications.

    state = {
        profile_first_name: '',
        profile_last_name: '',
        profile_phone: '',
        
    };
    constructor (props) {
        super(props);
    }

    _tryUpdateCompanyProfile(){
        
    }

    render () {
        const { user, loading } = this.props;

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
                            <Text style={[styles.title,{textAlign:'center'}]}>Profile Information</Text>
                            
                            
                            <View style={[{flexDirection:'row'}]}>
                                <TextInput
                                    style={[styles.textInput, {flex:1}, {marginRight: 5}]}
                                    onChangeText={(text) => this.setState({profile_first_name: text})}
                                    value={user.first_name}
                                    placeholder={"Enter First Name"}
                                />
                                <TextInput
                                    style={[styles.textInput, {flex:1},{marginLeft: 5}]}
                                    onChangeText={(text) => this.setState({profile_last_name: text})}
                                    value={user.last_name}
                                    placeholder={"Enter Last Name"}
                                />
                            </View>
                            
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({profile_phone: text})}
                                value={user.phone_number}
                                placeholder={"Enter Phone"}
                            />

                            <Text>Profile Image</Text>
                            <View style={[styles.logoContainer]}>
                                <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                            </View>
                            <TouchableOpacity style={styles.settingsUCPContainer} onPress={() => { console.log('upload new logo') }}>
                                <Text style={styles.settingsUpdateCompanyProfile}>Upload a New Profile Image</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.containerInner, {flex:0},{textAlign:'center'}]}>
                            <PrimaryButton
                            onPress={() => this._tryUpdateCompanyProfile()}
                            text="Save and Update"
                            enabled={this.state.company_name != '' && this.state.company_email != ''} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VTProfileInfoScreen);
