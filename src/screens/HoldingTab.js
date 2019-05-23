import React from 'react';
import { Image, View, Text, StatusBar, SafeAreaView, CheckBox } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { colors, viewportHeight } from '../styles/index.style';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { getUserdets } from '../redux/store';
import { Actions } from 'react-native-router-flux';

//Map the redux state to your props.
const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
    getUserdets: auth => getUserdets(auth),
}

class HoldingTabScreen extends React.Component {
    
    // TODO, notification and permission for location and push notifications.

    static navigationOptions = {
        header: null
      }

    componentDidMount() {
        this.props.getUserdets({token:this.props.auth.message});
    }

    render () {
        const { auth, loading } = this.props;

        return (
            <SafeAreaView >
                
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <View>
                        <LinearGradient colors={[colors.white, colors.chwAcceptButtonBlue]} style={[{height:viewportHeight}]} >
                            <View style={[styles.logoContainer]}>
                                <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                            </View>
                            <View style={styles.containerInner}>
                                <Text style={[styles.title,{textAlign:'center'}]}>Loading</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoldingTabScreen);
