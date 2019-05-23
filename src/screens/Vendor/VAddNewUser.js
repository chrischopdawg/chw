import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Picker } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import styles, { viewportHeight } from '../../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { postRegister } from '../../redux/store';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    postRegister: user => postRegister(user),
}

const passwordStrength = [
    {title:'Weak',color:'#ec0000',width:'33%'}, 
    {title:'Good',color:'#eba800',width:'66%'},
    {title:'Strong',color:'#7ee400',width:'100%'}
];

class VAddNewUserScreen extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone_number: '',
        user_type: 'tech',
        password: '',
        passwordCheck: '',
        profileImage: null,
    };
    constructor (props) {
        super(props);
    }

    _trySaveNewUser(){
        if(
            this.state.email == '' ||
            this.state.first_name == '' ||
            this.state.last_name == '' ||
            this.state.phone_number == '' ||
            this.state.password == '' || 
            this.state.password != this.state.passwordCheck) {
            return;
        }
        if(this.state.user_type == 'tech') {
            this.state = {...this.state, vendor: this.props.user.vendor_id};
        }
    
        this.props.postRegister(this.state);
    }

    _tryTakePhoto() {
        const options = {
            title: 'Select Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: response,
              });
            }
          });
    }

    _tryLibraryImage() { 
        const options = {
            title: 'Select Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: response,
              });
            }
          });
    }

    render () {
        const { user, loading } = this.props;
        var level = 0;
        if(this.state.password.length <= 3) {
            level = 0;
        } else if(this.state.password.length <= 6) {
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
                    
                    <KeyboardAwareScrollView style={[{height:viewportHeight}]}>
                        <View style={styles.containerInner}>
                            <Text style={[styles.title,{textAlign:'center'}]}>Add New User</Text>
                            
                            <View style={[{flexDirection:'row'}]}>
                                <TextInput
                                    style={[styles.textInput, {flex:1}, {marginRight: 5}]}
                                    onChangeText={(text) => this.setState({first_name: text})}
                                    value={this.state.first_name}
                                    placeholder={"Enter First Name"}
                                />
                                <TextInput
                                    style={[styles.textInput, {flex:1},{marginLeft: 5}]}
                                    onChangeText={(text) => this.setState({last_name: text})}
                                    value={this.state.last_name}
                                    placeholder={"Enter Last Name"}
                                />
                            </View>
                            
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({email: text})}
                                value={this.state.email}
                                placeholder={"Enter Email"}
                            />

                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({phone_number: text})}
                                value={this.state.phone_number}
                                placeholder={"Enter Phone"}
                            />

                            <Text>Profile Image</Text>
                            {this.state.profileImage ? (
                                <View style={[styles.logoContainer]}>
                                    <Image source={{uri:this.state.profileImage.uri}} style={styles.logo}/>
                                </View>
                            ) : (
                                <View style={[{flexDirection:'row'},{flex:1}]}>
                                    <TouchableOpacity onPress={() => this._tryLibraryImage()}>                                
                                        <View style={styles.buttonView}>
                                        <Text style={styles.buttonText}>
                                            Upload Photo
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._tryTakePhoto()}>
                                        <View style={styles.buttonView}>
                                        <Text style={styles.buttonText}>
                                            Take Photo
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                           
                            
                            <Text>Create a password for this User</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                                placeholder={"Password"}
                            />
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({passwordCheck: text})}
                                value={this.state.passwordCheck}
                                placeholder={"Confirm Password"}
                            />
                            {this.state.password ? (
                                    <View style={[{marginTop:15},{alignItems:'flex-start'}]}>
                                        <Text>Strength: {passwordStrength[level].title}</Text>
                                        <View style={[{marginTop:5},{borderColor:passwordStrength[level].color},{borderWidth:3},{height:6},{borderRadius:6},{width:passwordStrength[level].width}]}></View>
                                    </View>
                                ) : ( null )}
                        </View>
                        <View style={[styles.containerInner, {flex:0},{textAlign:'center'}]}>
                            <PrimaryButton
                            onPress={() => this._trySaveNewUser()}
                            text="Create User"
                            enabled={this.state.password != '' && this.state.passwordConfirm != ''} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VAddNewUserScreen);
