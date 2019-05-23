
import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import Feather from 'react-native-vector-icons/Feather';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
//import { getUsers } from '../../redux/store';
import { Actions } from 'react-native-router-flux';


//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getUsers: (token, vendor_id) => getUsers(token, vendor_id),
}

class VActiveScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null,
    workorders: [
      { id: 0, workordernum: 721440123, began_trip: "10:22 am", arrival_time: "10:41 am", time_spend: "0h 19mins", assigned_to: "Tom Jones", address: "Sanger TX, 76266-7558" },
      { id: 1, workordernum: 712201321, began_trip: "11:42 am", arrival_time: "1:01 pm", time_spend: "1h 39mins", assigned_to: "Jim Smith", address: "331 Business Lane" },
      { id: 2, workordernum: 724643510, began_trip: "09:13 am", arrival_time: "09:33 am", time_spend: "0h 20mins", assigned_to: "John Smith", address: "El Paso TX, 79924" },
      
    ]
  }
  componentDidMount() {
    //console.log(this.props);
    //this.props.getUsers(this.props.auth.token.message, this.props.user.vendor_id);
  }

  _viewRouteMap(workorder) {
    Alert.alert(
      "Test",
      "Work order # " + workorder.workordernum + " map view here",
      [
        {text: 'Close', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  _cancelWorkOrder(workorder) {
    Alert.alert(
      "Test",
      "Cancel work order # " + workorder.workordernum,
      [
        {text: 'Close', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render () {
    const { users, loading } = this.props;
      return (
        <SafeAreaView style={[{flex:1}]}>
          <View style={[{height:styles.viewportHeight}]}>
            <StatusBar
              translucent={false}
              backgroundColor={'rgba(0, 0, 0, 0.3)'}
              barStyle={'light-content'}
            />
            
            {!loading ? (
              <ScrollView style={[{height:viewportHeight}]}>
              <View style={styles.containerInner}>
                <View style={[{flex:1},{alignItems:'center'},{padding:10}]}>
                  <Text>Total of {this.state.workorders.length} active work orders</Text>
                </View>
                {this.state.workorders.map((val,key) => 
                  <View key={key} style={styles.activeWorkOrderContainer}>
                    <View style={styles.activeWorkOrderRow}>
                      <Text style={[styles.boldText, styles.activeTitle]}>SWO # {val.workordernum}</Text>
                    </View>
                    <View style={styles.activeWorkOrderRow}>
                      <View style={styles.activeWorkorderCol}>
                        <Text style={[styles.activeSmallGrayText]}>Began Trip</Text>
                        <Text style={[styles.heavyText]}>{val.began_trip}</Text>
                      </View>
                      <View style={styles.activeWorkorderCol}>
                        <Text style={[styles.activeSmallGrayText]}>Arrival Time</Text>
                        <Text style={[styles.heavyText]}>{val.arrival_time}</Text>
                      </View>
                    </View>
                    <View style={styles.activeWorkOrderRow}>
                      <View style={styles.activeWorkorderCol}>
                        <Text style={[styles.activeSmallGrayText]}>Technician Assigned</Text>
                        <Text style={[styles.boldText]}>{val.assigned_to}</Text>
                      </View>
                      <View style={styles.activeWorkorderCol}>
                        <Text style={[styles.activeSmallGrayText]}>Time Spend</Text>
                        <Text style={[styles.heavyText]}>{val.time_spend}</Text>
                      </View>
                    </View>
                    <View style={[styles.activeWorkOrderCol,{marginTop:10},{paddingHorizontal:5}]}>
                      <Text style={[styles.activeSmallGrayText]}>Location</Text>
                      <Text style={[styles.boldText]}>{val.address}</Text>
                    </View>
                    <View style={[styles.activeWorkOrderCol, {marginTop:10}]}>
                      <TouchableOpacity onPress={() => this._viewRouteMap(val) } style={styles.activeWorkorderButtonView}>
                        <Text style={styles.activeWorkorderButtonText}>View Tracked Path</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._cancelWorkOrder(val)} style={styles.activeWorkorderButtonView}>
                        <Text style={styles.activeWorkorderButtonText}>Cancel Work Order</Text>
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

VActiveScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VActiveScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VActiveScreen);
