
import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import { connect, } from 'react-redux';
import { messages } from '../../constants/messages';
import { TextInput } from 'react-native-gesture-handler';

import VRequestScreen from './VRequest';
import VPendingScreen from './VPending';
import VActiveScreen from './VActive';
import VCompletedScreen from './VCompleted';

//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getPeople: next => getPeople(next),

}

class VScheduleScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  CURRENT_VIEW = {
    REQUEST: 0,
    PENDING: 1,
    ACTIVE: 2,
    COMPLETED: 3,
  }

  state = {
    user: null,
    searching: false,
    search_param: '',
    current_view: this.CURRENT_VIEW.REQUEST,
  }
  _setCurrentView(view) {
    this.setState({current_view: view});
  }
  _searchThis(search) {
    this.setState({search_param:search});
    console.log(search);
    // filter all the things!!!
  }
  _searchWorkorders(toggle) {
    this.setState({searching:toggle});
  }
  _filterWorkorders() {

  }
  componentDidMount() {
    //this.props.getPeople();
    //this.setState({auth:this.props.auth});
  }
  render () {
    const { user, loading } = this.props;
    if(loading) {
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
                  <Text style={[styles.workorderHeaderTitle]}>Work Orders</Text>
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
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.REQUEST)} style={[styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.REQUEST ? styles.workorderTopTabItemActive : null]}>
                    <Text style={this.state.current_view == this.CURRENT_VIEW.REQUEST ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText}>Requests</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.PENDING)} style={[{flexDirection:'row'},styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.PENDING ? styles.workorderTopTabItemActive : null]}>
                    <Text style={[{marginStart:15}, this.state.current_view == this.CURRENT_VIEW.PENDING ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText]}>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.ACTIVE)} style={[styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.ACTIVE ? styles.workorderTopTabItemActive : null]}>
                    <Text style={this.state.current_view == this.CURRENT_VIEW.ACTIVE ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText}>Active</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._setCurrentView(this.CURRENT_VIEW.COMPLETED)} style={[styles.workorderTopTabItem, this.state.current_view == this.CURRENT_VIEW.COMPLETED ? styles.workorderTopTabItemActive : null]}>
                    <Text style={this.state.current_view == this.CURRENT_VIEW.COMPLETED ? styles.workorderTopTabItemTextActive : styles.workorderTopTabItemText}>Completed</Text>
                  </TouchableOpacity>
              </View>
            </View>
            
                {this.state.current_view == this.CURRENT_VIEW.REQUEST ? (
                  <VRequestScreen />
                ) : ( null )}

                {this.state.current_view == this.CURRENT_VIEW.PENDING ? (
                  <VPendingScreen />
                ) : ( null )}
                  
                {this.state.current_view == this.CURRENT_VIEW.ACTIVE ? (
                  <VActiveScreen />
                ) : ( null )}

                {this.state.current_view == this.CURRENT_VIEW.COMPLETED ? (
                  <VCompletedScreen />
                ) : ( null )}
           
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

VScheduleScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VScheduleScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VScheduleScreen);
