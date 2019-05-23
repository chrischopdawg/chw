
import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { getUsers } from '../../redux/store';
import { Actions } from 'react-native-router-flux';


//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  auth: state.auth,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  getUsers: (token, vendor_id) => getUsers(token, vendor_id),
}

export class ProfileUser extends React.Component {  
  _showActionSheet(user) {
    console.log(user);
    Alert.alert(
      "Select an action",
      "User selected " + user.first_name + " " + user.last_name,
      [
        {text: 'Manage User Profile', onPress: () => console.log('Profile Pressed')},
        {text: 'Manage Password', onPress: () => console.log('Password Pressed')},
        {text: 'Delete User', onPress: () => console.log('Delete Pressed')},
      ],
      {cancelable: false},
    );
  }

  render() {
    const user = this.props.user;

    return (  
      <View style={[styles.userInfoContainer, {flexDirection:'row'}]}>
          <View style={[styles.avatarContainer]}>
          
          </View>
          <View style={[styles.userInfoTextContainer]}>
              <Text style={styles.userInfoTextName}>{user.first_name} {user.last_name}</Text>
              <Text style={styles.userInfoText}>{user.email}</Text>
              <Text style={styles.userInfoText}>{user.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => { this._showActionSheet(user) }}>
            <MaterialCommunityIcons style={[{color:colors.lightGray}]} name={'dots-vertical'} size={20} />
          </TouchableOpacity>
      </View>
    )
  }
}

class VProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null
  }
  componentDidMount() {
    //console.log(this.props);
    this._getUsers();
  }

  _getUsers() {
    this.props.getUsers(this.props.auth.token.message, this.props.user.vendor_id);
  }

  render () {
    const { users, loading } = this.props;
    console.log(users);
      return (
        <SafeAreaView style={[{flex:1}]}>
          <View>
            <StatusBar
              translucent={false}
              backgroundColor={'rgba(0, 0, 0, 0.3)'}
              barStyle={'light-content'}
            />
            
            <View style={[{height:viewportHeight}]}>
              <View style={[{flexDirection:'row'}]}>
                <Text style={[styles.title,{textAlign:'left'},{flex:1}]}>All Users </Text>
                <TouchableOpacity style={[{flex:0}]} onPress={() => { Actions.VAddNewUser() }}>
                  <Feather name={'user-plus'} size={25} />
                </TouchableOpacity>
              </View>
              <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={() => {this._getUsers()}}
                />
              }>
                <View style={styles.containerInner}>
                  
                  
                  <Text style={[{marginVertical:10}]}>Admins</Text>
                  {users ? (
                    users
                    .filter(user => user.user_type == "vendor")
                    .map((value, key) => 
                      <ProfileUser key={key} user={value} />
                    )
                  ) : ( <Text>No Users Match Vendor Type</Text> )}
                  

                  <Text style={[{marginVertical:10}]}>Technicians</Text>
                  {users ? (
                    users
                    .filter(user => user.user_type == "technician")
                    .map((value, key) => 
                      <ProfileUser key={key} user={value} />
                    )
                  ) : ( <Text>No Users Match Technician Type</Text> )}
                  
                </View>
              </ScrollView>
            </View>
            
          </View>
        </SafeAreaView>
      );
    
  }
}

VProfileScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VProfileScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VProfileScreen);
