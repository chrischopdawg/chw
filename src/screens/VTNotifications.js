import React from 'react';
import { Text, View, SafeAreaView, StatusBar,ScrollView,RefreshControl } from 'react-native';
import styles, { viewportHeight, colors } from '../styles/index.style';
import { connect, } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getNotifications } from '../redux/store';

//Map the redux state to your props.
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  loading: state.loading,
  notifications: state.notifications
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getPeople: next => getPeople(next),
  getNotifications: (user, auth) => getNotifications(user, auth),

}

class VTNotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    //user: null,
    refreshing: false,
    /*

    "type": "assigned",
            "workOrderId": "",
            "stepId": "",
            "vendorId": "",
            "applianceBrand": "",
            "applianceType": "",
            "applianceSystem": "",
            "appointmentDate": "",
            "appointmentId": ""

    notifications: [
       
      { id: 1, type: "assigned", title: "You have 1 upcoming assigned work order.", message: "Air Conditioning\nWed, Oct 18, 2017\n9:00am - 7:00pm", time: "3:16pm"},
      { id: 2, type: "diagnosis", title: "3 work orders require a diagnosis.", message: null, time: "12:45pm"},
      { id: 3, type: "requests", title: "You have 12 work order requests.", message: null, time: "12:45pm"},
      { id: 4, type: "schedule", title: "You have 25 work order(s) not scheduled.", message: null, time: "10:46am"},
      { id: 5, type: "request", title: "1 new work order request.", message: null, time: "Yesterday"},
      { id: 6, type: "profile", title: "Your user profile is incomplete. Click here to complete it.", message: null, time: "Jan 3, 2019"},
    ] */
  }
  componentDidMount() {
    //this.props.getPeople();
    //this.setState({auth:this.props.auth});
    this.props.getNotifications(this.props.user, this.props.auth);
  }

  _notificationsRefresh() {
    console.log('refreshing');
    this.setState({refreshing: true});
    //fetchData().then(() => {
    //  this.setState({refreshing: false});
    //});
    setTimeout(() => {
      console.log('done');
      this.setState({refreshing: false});
    }, 5000);
  }

  _openNotification(notifiation) {
    switch(notifiation.type) {
      case "assigned":
      case "diagnosis":
      case "schedule-pending":
      case "requests":
      default:
        return;
    }
  }
  render () {
    const { notifications } = this.props;
    return (
      <SafeAreaView style={[{flex:1}]}>
        <View style={[{height:viewportHeight}]}>
          <StatusBar
            translucent={false}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          <View style={[styles.containerInner,{flex:0},{paddingVertical:5},{marginBottom:5}]}>
            <Text style={styles.title}>Notifications</Text>
          </View>
          {notifications && notifications == [] ? (
            <View style={[styles.containerInner]}>
            <View style={styles.nontificationsNone}>
              <Text style={[{color:colors.chwDarkBlue}]}>There are currently no notifications!</Text>
            </View>
          </View>
          ) : (
            <ScrollView 
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {this._notificationsRefresh()}}
                />
              }
              
            style={styles.containerInner}>
              
              {notifications.map((value,key) => {
                /*
                  applianceBrand: ""
                  applianceSystem: ""
                  applianceType: ""
                  appointmentDate: ""
                  appointmentId: ""
                  stepId: ""
                  type: "assigned"
                  vendorId: ""
                  workOrderId: "" 
                */
                return <TouchableOpacity key={key} style={styles.noticationContainer} onPress={() => this._openNotification(value)}>
                  <Text style={styles.notificationTitle}>Notification Title</Text>
                  {value.applianceBrand ? (
                    <View>
                      <Text style={styles.notificationMessage}>{value.applianceBrand} {value.applianceSystem} - {value.applianceType}</Text>
                      <Text style={styles.notificationMessage}>{value.appoointmentDate}</Text>
                    </View>
                    
                  ) : ( <Text>No Data</Text> )}
                  <Text style={styles.notificationTime}>{value.time}</Text>
                </TouchableOpacity>
              })}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VTNotificationsScreen);
