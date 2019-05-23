
import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView , Alert} from 'react-native';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import Feather from 'react-native-vector-icons/Feather';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
//import { getUsers } from '../../redux/store';
import { Actions } from 'react-native-router-flux';

import Entypo from 'react-native-vector-icons/Entypo';

import {messages} from '../../constants/messages';
import LinearGradient from 'react-native-linear-gradient';

//Map the redux state to your props.
const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getUsers: (token, vendor_id) => getUsers(token, vendor_id),
}

class VPendingScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null,
    pending: [
      { id: 0, workordernum: 724643510, first_line: "Dryer, Whirlpool / Electric", date: "2019-02-10", time: "10:00am", assigned_to: "Robert Paterson" },
      { id: 1, workordernum: 555555555, first_line: "Air Conditioning, Mitsubishi / Electric", date: "2019-02-13", time: "10:45am", assigned_to: "Jamie Wilson" },
      { id: 2, workordernum: 704565950, first_line: "Heating and Ductwork, Mitsubishi / Electric", date: "2019-02-20", time: "1:00pm", assigned_to: "Jonathan Brown" },
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
    
      return (
        <SafeAreaView style={[{flex:1}]}>
          <View style={[{height:viewportHeight}]}>
            <StatusBar
              translucent={false}
              backgroundColor={'rgba(0, 0, 0, 0.3)'}
              barStyle={'light-content'}
            />
            {!loading ? (
              <ScrollView style={[{height:viewportHeight}]}>
                <View style={styles.containerInner}>
                  <View style={styles.pendingWorkordersToAssign}>
                    <Text style={[{color:colors.white},{flex:1},{fontSize:15}]}>{this.state.pending.length} work orders need to be assigned</Text>
                    <Entypo name="chevron-right" size={18} color={colors.white} />
                  </View>
                  {this.state.pending.map((value, key) => 
                    <View key={key} style={styles.pendingContainer}>
                        <View style={[{flex:0},{marginRight:5}]}>
                          <View style={styles.pendingCalendarContainer}>
                              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.chwCalendarRed, colors.chwCalendarOrange]} style={styles.pendingCalendarHead}><Text style={[{fontSize:10},{color:colors.white},{fontWeight:'bold'}]}>FEB</Text></LinearGradient>
                              <View style={styles.pendingCalendarCenter}><Text style={[{fontSize:15},{fontWeight:'bold'}]}>25</Text></View>
                          </View>
                          <View style={[{alignItems:'center'}]}>
                            <Text style={styles.pendingTime}>10:00am</Text>
                          </View>
                        </View>
                        <View style={[{flex:1},{flexDirection:'column'}]}>
                            <Text style={styles.pendingHeading}>SWO # {value.workordernum}</Text>
                            <Text style={styles.pendingSub1}>{value.first_line}</Text>
                            <Text style={styles.pendingSub2}>Assigned to {value.assigned_to}</Text>
                        </View>
                        <View style={styles.pendingThreeDots}> 
                          <TouchableOpacity onPress={() => this._showContextMenu(value)}>
                            <Entypo name="dots-three-vertical" size={15} color={colors.chwText} />
                          </TouchableOpacity>
                        </View>
                    </View>
                    )}
                </View>
              </ScrollView>
            ) : (
              <View style={[styles.containerInner]}>
                <View style={styles.nontificationsNone}>
                  <Text style={[{color:colors.chwDarkBlue}]}>Loading.</Text>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      );
  }
}

VPendingScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VPendingScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VPendingScreen);
