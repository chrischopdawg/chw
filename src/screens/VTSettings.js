import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import store, { getLogout } from '../redux/store';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles from '../styles/index.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  getLogout: auth => getLogout(auth),
}

class VTSettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  }

  constructor (props) {
    super(props);
  }

  _signOut() {
    Alert.alert(
      'You are About to Logout of the Choice Home Warranty App',
      'Are you sure you want to preform this action?',
      [
        {text: 'Yes', onPress: () => {
          const auth = store.getState().auth
          this.props.getLogout(auth);
        }},
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
    
  }
  render () {
    const { user, loading } = this.props;
    if(!loading) {
      return (
        <View style={styles.containerSettings}>
          {user.user_type == "vendor" ? (
            <View>
              <View style={styles.settingsVendorTopContainer}>
                <Text>COMPANY LOGO</Text>
                <Text style={styles.settingsUpdateCompanyText}>company phone number</Text>
                <Text style={styles.settingsUpdateCompanyText}>company email</Text>
                <Text style={styles.settingsUpdateCompanyText}>company address</Text>
              </View>
              <TouchableOpacity style={styles.settingsUCPContainer} onPress={() => { Actions.VSettingsUpdateCompanyProfile() }}>
                <Text style={styles.settingsUpdateCompanyProfile}>Update Company Profile</Text>
              </TouchableOpacity>
            </View>
          ) : ( null )}
          
          <View style={styles.settingsVendorBottomContainer}>
            <TouchableOpacity style={[styles.settingsMenuItem]} onPress={() => { Actions.VTProfileInfo() }}>
              <Text style={[styles.settingsMenuTitle]}>Profile Information</Text>
              <FontAwesome style={[styles.settingsMenuArrow]} name={"angle-right"} size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingsMenuItem]} onPress={() => { Actions.VTLoginCreds() }}>
              <Text style={[styles.settingsMenuTitle]}>Login Cendential</Text>
              <FontAwesome style={[styles.settingsMenuArrow]} name={"angle-right"} size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingsMenuItem]} onPress={() => { Actions.VTTerms() }}>
              <Text style={[styles.settingsMenuTitle]}>Terms of Service</Text>
              <FontAwesome style={[styles.settingsMenuArrow]} name={"angle-right"} size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingsMenuItem]} onPress={() => { Actions.VTPrivacy() }}>
              <Text style={[styles.settingsMenuTitle]}>Privacy Policy</Text>
              <FontAwesome style={[styles.settingsMenuArrow]} name={"angle-right"} size={20} />
            </TouchableOpacity>

            <View style={[styles.settingsContainerInner]}>
              <PrimaryButton 
                  onPress={() => this._signOut()}
                  text={"Sign Out of App"}
                  enabled={true}
                />
            </View>

          </View>
        </View>
      );
    } else {
        return (
        <View style={styles.containerLoading}>
            <Text style={styles.loading}>Loading...........</Text>
        </View>
        )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VTSettingsScreen);
