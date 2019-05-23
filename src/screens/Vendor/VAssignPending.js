
import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView , Alert} from 'react-native';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import Feather from 'react-native-vector-icons/Feather';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
//import { getUsers } from '../../redux/store';
import { Actions } from 'react-native-router-flux';

import LinearGradient from 'react-native-linear-gradient';

import {messages} from '../../constants/messages';

//Map the redux state to your props.
const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getUsers: (token, vendor_id) => getUsers(token, vendor_id),
}

class VAssignPendingScreen extends React.Component {
  
  state = {
    user: null,
    pending: [
      { id: 0, workordernum: 721440123, system: "Dryer", date: null, time: null, assigned_to: null, address: "1234 test" },
      { id: 1, workordernum: 712201321, system: "Refrigerator", date: null, time: null, assigned_to: null, address: "1234 zippy" },
      { id: 2, workordernum: 724643510, system: "Refrigerator", date: "2019-02-12", time: "1:00pm", assigned_to: "John Smith", address: "1234 lane" },
      { id: 3, workordernum: 724643510, system: "Dryer", date: "2019-02-10", time: "10:00am", assigned_to: "Robert Paterson", address: "1234 home" },
      { id: 4, workordernum: 555555555, system: "Air Conditioning", date: "2019-02-13", time: "10:45am", assigned_to: "Jamie Wilson", address: "1234 main" },
      { id: 5, workordernum: 704565950, system: "Heater", date: "2019-02-20", time: "1:00pm", assigned_to: "Jonathan Brown", address: "1st test" },
    ]
  }
  componentDidMount() {
    //console.log(this.props);
    //this.props.getUsers(this.props.auth.token.message, this.props.user.vendor_id);
  }

  _showContextMenu(workorder) {
    Alert.alert(
      messages.MSG_SELECT_ACTION,
      "Work order # " + workorder.workordernum + "\nJob Assignee " + workorder.assigned_to,
      [
        {text: 'Reassign Technician', onPress: () => console.log('OK Pressed')},
        {text: 'Change Appointment Date and Time', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render () {
    const { users, loading } = this.props;
    if(!loading) {
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
                <View>
                  <Text style={styles.modalTitle}>Pending Work Orders to Assign</Text>
                </View>
                {this.state.pending.map((value, key) => 
                  <View key={key} style={styles.requestContainer}>
                      
                      <View style={[{flex:0}]}>
                        {value.assigned_to !== null ? (
                            <View>
                                <View style={styles.pendingCalendarContainer}>
                                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.chwCalendarRed, colors.chwCalendarOrange]} style={styles.pendingCalendarHead}>
                                    <Text style={[{fontSize:10},{color:colors.white},{fontWeight:'bold'}]}>FEB</Text>
                                
                                  </LinearGradient>
                                  <View style={styles.pendingCalendarCenter}><Text style={[{fontSize:15},{fontWeight:'500'}]}>25</Text></View>
                                </View>
                                <View style={[{alignItems:'center'}]}>
                                    <Text style={styles.pendingTime}>10:00am</Text>
                                </View>
                            </View>
                        ) : ( null )}
                      </View>
                      <View style={[{flex:1},{flexDirection:'column'}]}>
                          <Text style={styles.pendingHeading}>SWO # {value.workordernum}</Text>
                          <Text style={styles.pendingSub1}>System: {value.system}</Text>
                          <Text style={styles.pendingSub2}>{value.address}</Text>
                      </View>
                      <View style={[styles.pendingThreeDots,{flexDirection:'row'}]}> 
                        {value.date === null ? (
                            <TouchableOpacity onPress={() => this._showContextMenu(value)}>
                                <Text>C</Text>
                            </TouchableOpacity>
                        ) : ( null )}
                        
                        <TouchableOpacity onPress={() => this._showContextMenu(value)}>
                          <Text>U+</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                  )}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else {
        return (
          <View style={[styles.containerInner]}>
            <View style={styles.nontificationsNone}>
              <Text style={[{color:colors.chwDarkBlue}]}>Loading.</Text>
            </View>
          </View>
        )
    }
  }
}

VAssignPendingScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VAssignPendingScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VAssignPendingScreen);
