import React from 'react';
import { View, Platform } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import store from './src/redux/store';

// Onboarding / Authentication Screens
import OnboardingScreen from './src/screens/Onboarding';
import LoginScreen from './src/screens/Login';
import ResetPasswordScreen from './src/screens/ResetPassword';

// Temporary screen for screens we don't have yet.
import FirstTabScreen from './src/screens/FirstTabScreen';

// Shared Screens
import VTNotificationsScreen from './src/screens/VTNotifications';
import VTSettingsScreen from './src/screens/VTSettings';
import VTProfileInfoScreen from './src/screens/VTProfileInfo';
import VTLoginCredsScreen from './src/screens/VTLoginCredentials';
import VTPrivacyScreen from './src/screens/VTPrivacy';
import VTTermsScreen from './src/screens/VTTerms';

// Vendor Screens
import VScheduleScreen from './src/screens/Vendor/VSchedule';
import VRequestsScreen from './src/screens/Vendor/VRequest';
import VAssignPendingScreen from './src/screens/Vendor/VAssignPending';
import VPendingScreen from './src/screens/Vendor/VPending';
import VActiveScreen from './src/screens/Vendor/VActive';
import VCompletedScreen from './src/screens/Vendor/VCompleted';
import VWorkOrderScreen from './src/screens/Vendor/VWorkOrder';
import VProfileScreen from './src/screens/Vendor/VProfile';
import VUpdateCompanyProfileScreen from './src/screens/Vendor/VUpdateCompanyProfile';
import VAddNewUserScreen from './src/screens/Vendor/VAddNewUser';

// Tech Screens
import TAssigned from './src/screens/Tech/TAssigned';
import TDiagnosis from './src/screens/Tech/TDiagnosis';
import TCompleted from './src/screens/Tech/TCompleted';

// Style and Iconography
import styles, { colors } from './src/styles/index.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export class TabBarCompVMyWorkOrders extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render () {
    const currentScreen = Actions.currentScene;

    return (
      <View style={[{flexDirection:'row'},{marginBottom:25}]}>
        <View onTouchEnd={() => { Actions.jump('VNotifications') }}  style={styles.tabNavContainer}>
          <FontAwesome name="bell-o" size={25} color={currentScreen == "_VNotifications" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View> 
        
        <View onTouchEnd={() => { Actions.jump('VSchedule') }} style={styles.tabNavContainer}>
          <FontAwesome name="calendar" size={25} color={currentScreen == "_VSchedule" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>

        <View onTouchEnd={() => { Actions.jump('VWorkOrder') }}  style={styles.tabNavContainer}>
          <FontAwesome name="stack-overflow" size={25} color={currentScreen == "_VWorkOrder" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>

        <View onTouchEnd={() => { Actions.jump('VProfile') }}  style={styles.tabNavContainer}>
          <MaterialIcons name="portrait" size={25} color={currentScreen == "_VProfile" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>

        <View onTouchEnd={() => { Actions.jump('VTSettings') }}  style={styles.tabNavContainer}>
          <SimpleLineIcons name="wrench" size={25} color={currentScreen == "_VTSettings" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>

      </View>
    );
  }
}

export class TabBarCompTMyWorkOrders extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render () {
    const currentScreen = Actions.currentScene;

    return (
      <View style={[{flexDirection:'row'},{marginBottom:25}]}>
        <View onTouchEnd={() => { Actions.jump('TNotifications') }}  style={styles.tabNavContainer}>
          <FontAwesome name="bell-o" size={25} color={currentScreen == "_connections" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View> 
  
        <View onTouchEnd={() => { Actions.jump('TDiagnosis') }} style={styles.tabNavContainer}>
          <FontAwesome name="stack-overflow" size={25} color={currentScreen == "_connections" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>
      
        <View onTouchEnd={() => { Actions.jump('VTSettings') }}  style={[styles.tabNavContainer]}>
          <SimpleLineIcons name="wrench" size={25} color={currentScreen == "_VTSettings" ? colors.chwCalendarRed : colors.chwLightBlue} />
        </View>

      </View>
    );
  }
}


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router uriPrefix="chw">
          
          <Scene key="root"
            hideNavBar={true}
          >
            <Scene key="onboarding"
              component={LoginScreen}
              title="Onboarding"
              initial
            />
            <Scene
              key="login"
              component={LoginScreen}
            />
            <Scene
              key="resetpassword"
              component={ResetPasswordScreen}
              hideNavBar={false}
            />
            <Scene
              key="VMyWorkOrders"
              tabs={true}
              tabBarComponent={TabBarCompVMyWorkOrders}
              activeTintColor="#f00"
              hideNavBar={true}
            >
              <Scene
                  key="VNotifications"
                  component={VTNotificationsScreen}
                  navBar={null}
                  initial
                />
              <Scene
                key="VSchedule"
                component={VScheduleScreen}
                
                />
                
              <Scene
                  key="VWorkOrder"
                  component={VWorkOrderScreen}
                  navBar={null} />
              <Scene
                  key="VProfile"
                  component={VProfileScreen}
                  navBar={null}
                />
              <Scene
                  key="VTSettings"
                  component={VTSettingsScreen}
                  navBar={null}
                />
              <Scene
                  key="VSettingsUpdateCompanyProfile"
                  component={VUpdateCompanyProfileScreen}
                  navBar={null}
              />
              <Scene
                  key="VTProfileInfo"
                  component={VTProfileInfoScreen}
                  navBar={null}
              />
              <Scene
                key="VAddNewUser"
                component={VAddNewUserScreen}
                navBar={null}
              />
              <Scene
                  key="VTLoginCreds"
                  component={VTLoginCredsScreen}
                  navBar={null}
              />
              <Scene
                  key="VTTerms"
                  component={VTTermsScreen}
                  navBar={null}
              />
              <Scene
                  key="VTPrivacy"
                  component={VTPrivacyScreen}
                  navBar={null}
              />
            </Scene>
  
            <Scene
              key="TMyWorkOrders"
              tabs={true}
              tabBarComponent={TabBarCompTMyWorkOrders}
              activeTintColor="#f00"
              hideNavBar={true}
            >
              <Scene
                  key="TNotifications"
                  component={VTNotificationsScreen}
                  navBar={null}
                />
              <Scene
                tabs={true}
                >
                <Scene
                  key="TAssigned"
                  component={TAssigned}
                  initial
                  navBar={null}
                />
                <Scene
                  key="TDiagnosis"
                  component={TDiagnosis}
                  navBar={null}
                />
                <Scene
                  key="TCompleted"
                  component={TCompleted}
                  navBar={null}
                />
                </Scene>
              
              <Scene
                  key="VTSettings"
                  component={VTSettingsScreen}
                  navBar={null}
                />
              <Scene
                  key="VTProfileInfo"
                  component={VTProfileInfoScreen}
                  navBar={null}
              />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
  
}

export default App;