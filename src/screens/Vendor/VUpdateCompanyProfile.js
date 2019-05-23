import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import styles, { viewportHeight } from '../../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
//import { postAuthToken } from '../redux/store';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    //postAuthToken: user => postAuthToken(user),
}

class VUpdateCompanyProfileScreen extends React.Component {

    state = {
        company_profile_image: require('../../../assets/images/logo.png'),
        company_name: 'ABC Company',
        company_email: '123-456-7890',
        company_phone: 'inquiries@abcCompany.com',
        company_address: '2760 Catherine Drive, New Rockford',
    };
    constructor (props) {
        super(props);
    }

    _tryUpdateCompanyProfile(){
        
    }

    _startImagePicker() {
        const options = {
          title: 'Select Picture',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({company_profile_image:response});
            }
        });
    }

    render () {
        const { user, loading } = this.props;
        console.log(this.state.company_profile_image);
        return (
            <SafeAreaView style={[{flex:1}]}>
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <View style={[{height:'100%'}]}>
                        <View style={[styles.containerInner]}>
                            <Text style={[styles.smallTitle]}>Company Profile</Text>
                            <Text style={[{textAlign:'center'}]}>Update Company Profile</Text>
                            <View style={[styles.logoContainer]}>
                                {this.state.company_profile_image.uri ? (
                                    <Image 
                                        resizeMode={'contain'}
                                        source={{uri: this.state.company_profile_image.uri}} 
                                        style={styles.logo}
                                    />
                                ) : (
                                    <Image 
                                        resizeMode={'contain'}
                                        source={this.state.company_profile_image} 
                                        style={styles.logo}
                                    />
                                )}
                                
                            </View>
                            <TouchableOpacity style={styles.settingsUCPContainer} onPress={() => { this._startImagePicker() }}>
                                <Text style={styles.settingsUpdateCompanyProfile}>Upload a New Logo</Text>
                            </TouchableOpacity>
                            
                            <TextInput
                                style={styles.textInput}
                                keyboardType={'email-address'}
                                onChangeText={(text) => this.setState({company_name: text})}
                                value={this.state.company_name}
                                placeholder={"Enter Company Name"}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({company_email: text})}
                                value={this.state.company_email}
                                placeholder={"Enter Company Email"}
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({company_phone: text})}
                                value={this.state.company_phone}
                                placeholder={"Enter Company Phone"}
                            />
                            <Text>{this.state.company_address}</Text>

                        </View>
                        <View style={[{flex:0},{paddingHorizontal:25}]}>
                            <PrimaryButton
                            onPress={() => this._tryUpdateCompanyProfile()}
                            text="Save and Update"
                            enabled={this.state.company_name != '' && this.state.company_email != ''} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VUpdateCompanyProfileScreen);
