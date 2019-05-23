import React from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
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

class TDiagnosisScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null
  }
  componentDidMount() {
    //console.log(this.props);
    //this.props.getUsers(this.props.auth.token.message, this.props.user.vendor_id);
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
                <Text>Diagnosis 7.2.0</Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Loading...........</Text>
        </View>
        )
    }
  }
}

TDiagnosisScreen.propTypes = {
  id: PropTypes.number.isRequired
}
TDiagnosisScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(TDiagnosisScreen);
