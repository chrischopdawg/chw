
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bb00',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

//Map the redux state to your props.
const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
})

//Map your action creators to your props.
const mapDispatchToProps = {
  //getPeople: next => getPeople(next),

}

class FirstTabScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    user: null
  }
  componentDidMount() {
    //this.props.getPeople();
    //this.setState({auth:this.props.auth});
  }
  render () {
    const { user, loading } = this.props;
    if(!loading) {
      return (
      <View style={styles.container}>
        <Text>{user.first_name} - {user.user_type}</Text>
      </View>
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

FirstTabScreen.propTypes = {
  id: PropTypes.number.isRequired
}
FirstTabScreen.defaultProps = {
  id: 0
}


export default connect(mapStateToProps, mapDispatchToProps)(FirstTabScreen);
