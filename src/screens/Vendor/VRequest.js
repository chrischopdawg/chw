
import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styles, { viewportHeight, colors } from '../../styles/index.style';
import Feather from 'react-native-vector-icons/Feather';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
//import { getUsers } from '../../redux/store';
import { Actions } from 'react-native-router-flux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  loading: state.loading
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getUsers: (token, vendor_id) => getUsers(token, vendor_id),
}


class VRequestScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null,
    requests: [
      { id: 0, workordernum: 724643510, first_line: "Drywer, Whirlpool / Electric", second_line: "Sanger, TX 76266-7558" },
      { id: 1, workordernum: 555555555, first_line: "Air Conditioning, Mitsubishi / Electric", second_line: "Sanger, TX 76266-7558" },
      { id: 2, workordernum: 704565950, first_line: "Heating and Ductwork, Mitsubishi / Electric", second_line: "Sanger, TX 76266-7558" },
    ]
  }
  componentDidMount() {
    //console.log(this.props);
    //this.props.getUsers(this.props.auth.token.message, this.props.user.vendor_id);
  }

  _removeRequest(id) {
    this.state.requests.forEach((value, key) => {
      if(value.id == id) {
        this.state.requests = this.setState({requests: this.state.requests.filter(item => item.id != id)});
      }
    });
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
                <View style={[{alignItems:'center'},{alignContent:'center'},{padding:10}]}>
                  <Text>Total of {this.state.requests.length} Work Order Requests</Text>
                </View>
                {this.state.requests.map((value, key) => 
                  <View key={key} style={[styles.requestContainerOutter,{flexDirection:'row'}]}>
                      <View style={[{flex:1},{flexDirection:'column'}]}>
                          <Text style={styles.requestHeadline}>SWO # {value.workordernum}</Text>
                          <Text style={styles.requestSubtext}>{value.first_line}</Text>
                          <Text style={styles.requestSubtext}>{value.second_line}</Text>
                      </View>
                      <View style={[{flex:0},{flexDirection:'row'}]}>
                        <TouchableOpacity style={[styles.requestIcon,{backgroundColor: colors.chwGreenCheck}]}>
                          <FontAwesome name="check" size={17} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this._removeRequest(value.id); }} style={[styles.requestIcon,{backgroundColor: colors.chwRedX}]}>
                          <FontAwesome name="remove" size={17} color={colors.white} />
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

VRequestScreen.propTypes = {
  id: PropTypes.number.isRequired
}
VRequestScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(VRequestScreen);
