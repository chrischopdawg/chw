
import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import { connect, } from 'react-redux';
import { messages } from '../../constants/messages';
import { TextInput } from 'react-native-gesture-handler';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';

//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  loading: !state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getPeople: next => getPeople(next),

}



class VWorkOrderScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  CURRENT_VIEW = {
    ASSIGNED: 0,
    DIAGNOSIS: 1,
    COMPLETED: 2
  }

  state = {
    user: null,
    searching: false,
    search_param: '',
    current_view: this.CURRENT_VIEW.ASSIGNED,
    expanded_work_order: -1,
    tracking_work_order: -1,
    workorders: [
      { id: 0, workordernum: 724643510, began_trip: "10:22 am", arrival_time: "10:41 am", scheduled_time: "10:45am - 1:25pm", contact_no: "1234567890", client_name: "Emma Smith", brand_type: "Whirlpool / Electric", issue: "Fuse tripping", system: "Dryer", first_line: "Dryer, Whirlpool / Electric", date: "2019-02-10", time: "10:00am", assigned_to: "Robert Paterson", address: "123 Main st, Dallas TX", tracking: false },
      { id: 1, workordernum: 555555555, began_trip: "1:22 pm", arrival_time: "1:59 pm", scheduled_time: "2:00pm - 5:00pm", contact_no: "1234567890", client_name: "Earl Jones", brand_type: "GE / Electric", issue: "No cold air", system: "Air Conditioning", first_line: "Air Conditioning, Mitsubishi / Electric", date: "2019-02-13", time: "10:45am", assigned_to: "Jamie Wilson", address: "332 Carlson, Dallas TX", tracking: true },
      { id: 2, workordernum: 704565950, began_trip: "10:22 am", arrival_time: "11:01 am", scheduled_time: "11:00am - 1:00pm", contact_no: "1234567890", client_name: "Debbie Moore", brand_type: "Bunson / Gas", issue: "No hot air", system: "Heating", first_line: "Heating and Ductwork, Mitsubishi / Electric", date: "2019-02-20", time: "1:00pm", assigned_to: "Jonathan Brown", address: "8766 1st, Dallas TX", tracking: false },
    ],
    requireDiagnosis: [
      { id: 0, workordernum: 881032552, began_trip: "10:22 am", arrival_time: "10:41 am", scheduled_time: "10:45am - 1:25pm", contact_no: "1234567890", client_name: "Emma Smith", brand_type: "Whirlpool / Electric", issue: "Fuse tripping", system: "Dryer", first_line: "Dryer, Whirlpool / Electric", date: "2019-02-10", time: "10:00am", assigned_to: "Robert Paterson", address: "123 Main st, Dallas TX", tracking: false },
      { id: 1, workordernum: 883120432, began_trip: "1:22 pm", arrival_time: "1:59 pm", scheduled_time: "2:00pm - 5:00pm", contact_no: "1234567890", client_name: "Earl Jones", brand_type: "GE / Electric", issue: "No cold air", system: "Air Conditioning", first_line: "Air Conditioning, Mitsubishi / Electric", date: "2019-02-13", time: "10:45am", assigned_to: "Jamie Wilson", address: "332 Carlson, Dallas TX", tracking: false },
      { id: 2, workordernum: 883124321, began_trip: "10:22 am", arrival_time: "11:01 am", scheduled_time: "11:00am - 1:00pm", contact_no: "1234567890", client_name: "Debbie Moore", brand_type: "Bunson / Gas", issue: "No hot air", system: "Heating", first_line: "Heating and Ductwork, Mitsubishi / Electric", date: "2019-02-20", time: "1:00pm", assigned_to: "Jonathan Brown", address: "8766 1st, Dallas TX", tracking: false },
    ],
    workordersCompleted: [
      { id: 0, workordernum: 881032552, began_trip: "10:22 am", arrival_time: "10:41 am", scheduled_time: "10:45am - 1:25pm", contact_no: "1234567890", client_name: "Emma Smith", brand_type: "Whirlpool / Electric", issue: "Fuse tripping", system: "Dryer", first_line: "Dryer, Whirlpool / Electric", date: "2019-02-10", time: "10:00am", assigned_to: "Robert Paterson", address: "123 Main st, Dallas TX", tracking: false },
      { id: 1, workordernum: 883120432, began_trip: "1:22 pm", arrival_time: "1:59 pm", scheduled_time: "2:00pm - 5:00pm", contact_no: "1234567890", client_name: "Earl Jones", brand_type: "GE / Electric", issue: "No cold air", system: "Air Conditioning", first_line: "Air Conditioning, Mitsubishi / Electric", date: "2019-02-13", time: "10:45am", assigned_to: "Jamie Wilson", address: "332 Carlson, Dallas TX", tracking: false },
      { id: 2, workordernum: 883124321, began_trip: "10:22 am", arrival_time: "11:01 am", scheduled_time: "11:00am - 1:00pm", contact_no: "1234567890", client_name: "Debbie Moore", brand_type: "Bunson / Gas", issue: "No hot air", system: "Heating", first_line: "Heating and Ductwork, Mitsubishi / Electric", date: "2019-02-20", time: "1:00pm", assigned_to: "Jonathan Brown", address: "8766 1st, Dallas TX", tracking: false },
    ],
  }

  _setCurrentView(view) {
    this.setState({current_view: view});
  }
  _callCustomer(workorder) { 
    Alert.alert(
      '',
      'Call ' + workorder.contact_no + ' ?',
      [
        {text: 'Yes', onPress: () => console.log('OK Pressed')},
        {text: 'No', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  _onMyWay(workorder, key) {
    Alert.alert(
      messages.TRY_START_TRACKING_WORK_ORDER_TITLE,
      messages.TRY_START_TRACKING_WORK_ORDER_MESSAGE,
      [
        {text: 'Yes', onPress: () => {
          workorder.tracking = true;
          this.setState([{expanded_work_order: key},{tracking_work_order:key}]);
        }},
        {text: 'No', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  _showContextMenu(key) {
    if(this.state.expanded_work_order == key) {
      this.setState({expanded_work_order: -1});
    }
    else {
      this.setState({expanded_work_order: key});
    }
    
  }
  _goToDiagnosis(workorder) {
    console.log(workorder);
  }
  _goToWorkorderDetails(workorder) {
    console.log(workorder);
  }

  _filterWorkorders() {

  }
  _searchThis(search) {
    this.setState({search_param:search});
    console.log(search);
    // filter all the things!!!
  }
  _searchWorkorders(toggle) {
    this.setState({searching:toggle});
  }
  componentDidMount() {
    //this.props.getPeople();
    //this.setState({auth:this.props.auth});
  }
  render () {
    const { user, loading } = this.props;
    if(!loading) {
      return (
        <SafeAreaView style={[{flex:1}]}>
          <View>
            <StatusBar
              translucent={false}
              backgroundColor={'rgba(0, 0, 0, 0.3)'}
              barStyle={'light-content'}
            />
            <View style={styles.workorderHeader}>
              {!this.state.searching ? (
                <View style={styles.workorderSearchBar}>
                  <Text style={[styles.workorderHeaderTitle]}>My Work Orders</Text>
                  <TouchableOpacity onPress={() => { this._filterWorkorders() }}>
                    <Text style={[styles.workorderHeaderIcon]}>F</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this._searchWorkorders(true) }}>
                    <Text style={[styles.workorderHeaderIcon]}>S</Text>
                  </TouchableOpacity>
                </View>
              ) : ( 
                <View style={[styles.workorderSearchBar,{alignItems:'center'}]}>
                    <TextInput style={[styles.textInput,{marginLeft:25},{flex:1}]} value={this.state.search_param} onChangeText={(text) => this._searchThis(text)} />
                  <TouchableOpacity onPress={() => { this._searchWorkorders(false) }}>
                    <Text style={[styles.workorderHeaderIcon,{marginHorizontal:15}]}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.workorderTopTabs}>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.ASSIGNED)} style={[styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.ASSIGNED ? styles.workorderTopTabItemActive : null]}>
                    <Text style={this.state.current_view == this.CURRENT_VIEW.ASSIGNED ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText}>Assigned</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.DIAGNOSIS)} style={[{flexDirection:'row'},styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.DIAGNOSIS ? styles.workorderTopTabItemActive : null]}>
                    <Text style={[{marginStart:15}, this.state.current_view == this.CURRENT_VIEW.DIAGNOSIS ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText]}>Diagnosis</Text>
                    <View style={styles.redBubble}><Text style={styles.redBubbleText}>{this.state.requireDiagnosis.length}</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.COMPLETED)} style={[styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.COMPLETED ? styles.workorderTopTabItemActive : null]}>
                    <Text style={this.state.current_view == this.CURRENT_VIEW.COMPLETED ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText}>Completed</Text>
                  </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={[{height:viewportHeight}]}>
              <View style={styles.containerInner}>
                {this.state.current_view == this.CURRENT_VIEW.ASSIGNED ? (
                <View> 
                  <View style={[{flex:1},{alignItems:'center'},{padding:10}]}>
                    <Text>A total of {this.state.workorders.length} work orders assigned</Text>
                  </View>
                  {this.state.workorders
                   // .filter((w) =>  (w.tracking === false))
                    .map((value,key) => 
                    <View key={key} style={[styles.activeWorkOrderContainer,(key % 2 == 0) ? {opacity: .3} : null]} >
                      <View style={styles.requestContainer}>
                        <View style={[{flex:0}]}>
                          <View style={styles.pendingCalendarContainer}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.chwCalendarRed, colors.chwCalendarOrange]} style={styles.pendingCalendarHead}>
                              <Text style={[{fontSize:10},{color:colors.white}]}>FEB</Text>
                            </LinearGradient>
                            <View style={styles.pendingCalendarCenter}><Text style={[{fontSize:15},{fontWeight:'500'}]}>25</Text></View>
                          </View>
                          <View style={[{alignItems:'center'},{alignContent:'center'}]}>
                            <Text style={styles.pendingTime}>10:00am</Text>
                          </View>
                        </View>
                        <View style={[{flex:1},{flexDirection:'column'}]}>
                            <Text style={styles.pendingHeading}>SWO # {value.workordernum}</Text>
                            <Text style={styles.pendingSub1}>System: <Text style={[styles.boldText,{color:colors.black}]}>{value.system}</Text></Text>
                            <Text style={styles.pendingSub1}>{value.address}</Text>
                        </View>
                        <View style={[styles.pendingThreeDots,{paddingVertical:25}]}> 
                          {value.tracking ? (
                            <View style={styles.activeWorkorderTrackingMarker}>
                              <Text style={[{color:colors.chwLightBlue},{fontSize:12},{fontWeight:'bold'}]}>Tracking</Text>
                            </View>
                          ) : (
                            <TouchableOpacity onPress={() => this._showContextMenu(key)}>
                              {this.state.expanded_work_order == key ? ( 
                                <EvilIcons name="chevron-up" size={25} />
                              ) : ( 
                                <EvilIcons name="chevron-down" size={25} />
                              )}
                            </TouchableOpacity>
                          )}
                          
                        </View>
                      </View>
                      {this.state.expanded_work_order == key || value.tracking ? (
                          <View>
                            <View style={styles.workorderExpanded}>
                              {value.tracking ? (
                                <View style={[styles.activeWorkOrderRow,styles.activeWorkorderTracking]}>
                                  <View style={styles.activeWorkorderCol}>
                                    <Text style={[styles.activeSmallGrayText]}>Began Trip</Text>
                                    <Text style={[styles.boldText]}>{value.began_trip}</Text>
                                  </View>
                                  <View style={styles.activeWorkorderCol}>
                                    <Text style={[styles.activeSmallGrayText]}>Arrival Time</Text>
                                    <Text style={[styles.boldText]}>{value.arrival_time}</Text>
                                  </View>
                                </View>
                              ) : ( null )}
                              <View style={styles.activeWorkOrderRow}>
                                <View style={styles.activeWorkorderCol}>
                                  <Text style={[styles.activeSmallGrayText]}>Scheduled Time</Text>
                                  <Text style={[styles.boldText]}>{value.scheduled_time}</Text>
                                </View>
                                <View style={styles.activeWorkorderCol}>
                                  <Text style={[styles.activeSmallGrayText]}>Contact No.</Text>
                                  <TouchableOpacity onPress={() => this._callCustomer(value)}>
                                    <Text style={[styles.boldText,styles.underLine]}>{value.contact_no}</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.activeWorkOrderRow}>
                                <View style={styles.activeWorkorderCol}>
                                  <Text style={[styles.activeSmallGrayText]}>Client Name</Text>
                                  <Text style={[styles.boldText]}>{value.client_name}</Text>
                                </View>
                                <View style={styles.activeWorkorderCol}>
                                  <Text style={[styles.activeSmallGrayText]}>Brand / Type</Text>
                                  <Text style={[styles.boldText]}>{value.brand_type}</Text>
                                </View>
                              </View>
                              <View style={[styles.activeWorkOrderCol,{marginTop:10}]}>
                                <Text style={[styles.activeSmallGrayText]}>Issue</Text>
                                <Text style={[styles.boldText]}>{value.issue}</Text>
                              </View>
                            </View>
                            {value.tracking ? (
                              <View>
                                <TouchableOpacity style={[styles.buttonView,styles.buttonViewLight]} onPress={() => this._onMyWay(value, key)}>
                                  <Text style={styles.buttonText}>Submit Diagnosis</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.activeWorkorderButtonView} onPress={() => this._onMyWay(value, key)}>
                                  <Text style={styles.activeWorkorderButtonText}>Completed Under Authorization Limit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.activeWorkorderButtonView} onPress={() => this._onMyWay(value, key)}>
                                  <Text style={styles.activeWorkorderButtonText}>Customer Canceled</Text>
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <TouchableOpacity style={[styles.buttonView, styles.buttonViewLight]} onPress={() => this._onMyWay(value, key)}>
                                <Text style={styles.buttonText}>On My Way</Text>
                              </TouchableOpacity>
                            )}
                            
                          </View>
                        ) : ( null )}
                        {key % 2 == 0 ? (
                      <View style={[{backgroundColor:'#aaaaaa22'},{position:'absolute'},{top:0},{bottom:0},{left:0},{right:0}]}></View>
                      ) : ( null )}
                    </View> 
                  )}
                </View>
              ): (null)}
              {this.state.current_view == this.CURRENT_VIEW.DIAGNOSIS ? (
                <View>
                  <View style={[{flex:1},{alignItems:'center'},{padding:10}]}>
                    <Text>A total of {this.state.requireDiagnosis.length} work orders require diagnosis</Text>
                  </View>
                  {this.state.requireDiagnosis
                    .map((value, key) => 
                    <TouchableOpacity key={key} style={[styles.activeWorkOrderContainer]} onPress={() => {this._goToDiagnosis(value)}}>
                      <View style={styles.requestContainer}>
                        <View style={[{flex:0}]}>
                          <View style={styles.pendingCalendarContainer}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.chwCalendarRed, colors.chwCalendarOrange]} style={styles.pendingCalendarHead}>
                              <Text style={[{fontSize:10},{color:colors.white}]}>FEB</Text>
                            </LinearGradient>
                              <View style={styles.pendingCalendarCenter}><Text style={[{fontSize:15},{fontWeight:'500'}]}>25</Text></View>
                          </View>
                          <View style={[{alignItems:'center'}]}>
                            <Text style={styles.pendingTime}>10:00am</Text>
                          </View>
                        </View>
                        <View style={[{flex:1},{flexDirection:'column'}]}>
                            <Text style={styles.pendingHeading}>SWO # {value.workordernum}</Text>
                            <Text style={styles.pendingSub1}>System: <Text style={[styles.boldText,{color:colors.black}]}>{value.system}</Text></Text>
                            <Text style={styles.pendingSub1}>{value.address}</Text>
                            <View style={[{backgroundColor:'#f4dadc'},{padding:3},{width:130},{borderRadius:5},{alignItems:'center'}]}>
                              <Text style={[{color:colors.chwRedX},{fontSize:11},{fontWeight:'bold'}]}>Diagnosis Required</Text>
                            </View>
                        </View>
                      </View>
                    </TouchableOpacity> 
                    )}
                </View>
              ) : ( null )}  
                {this.state.current_view == this.CURRENT_VIEW.COMPLETED ? (
                <View>
                  <View style={[{flex:1},{alignItems:'center'},{padding:10}]}>
                    <Text>A total of {this.state.requireDiagnosis.length} completed work orders</Text>
                  </View>
                  {this.state.workordersCompleted
                    .map((value, key) => 
                    <TouchableOpacity key={key} style={[styles.activeWorkOrderContainer]} onPress={() => {this._goToWorkorderDetails(value)}}>
                      <View style={styles.requestContainer}>
                        <View style={[{flex:0}]}>
                          <View style={styles.pendingCalendarContainer}>
                          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.chwCalendarRed, colors.chwCalendarOrange]} style={styles.pendingCalendarHead}>
                              <Text style={[{fontSize:10},{color:colors.white}]}>FEB</Text>
                            </LinearGradient>
                              <View style={styles.pendingCalendarCenter}><Text style={[{fontSize:15},{fontWeight:'500'}]}>25</Text></View>
                          </View>
                          <View style={[{alignItems:'center'}]}>
                            <Text style={styles.pendingTime}>10:00am</Text>
                          </View>
                        </View>
                        <View style={[{flex:1},{flexDirection:'column'}]}>
                            <Text style={styles.pendingHeading}>SWO # {value.workordernum}</Text>
                            <Text style={styles.pendingSub1}>System: <Text style={[styles.boldText,{color:colors.black}]}>{value.system}</Text></Text>
                            <Text style={styles.pendingSub1}>{value.address}</Text>
                        </View>
                      </View>
                    </TouchableOpacity> 
                    )}
                </View>
              ) : ( null )} 
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

VWorkOrderScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VWorkOrderScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VWorkOrderScreen);
