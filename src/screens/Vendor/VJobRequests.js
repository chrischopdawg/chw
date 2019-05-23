import React from 'react';
import { Modal, TouchableOpacity, TouchableHighlight, View, ScrollView, Text, StatusBar, SafeAreaView, CheckBox } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import styles from '../../styles/index.style';
import Toaster, { ToastStyles } from 'react-native-toaster'
import { TextInput } from 'react-native-gesture-handler';

export default class VJobRequestsScreen extends React.Component {
    
    // TODO, notification and permission for location and push notifications.

    static navigationOptions = {
        title: 'Work Orders'
      }

    constructor (props) {
        super(props);
        this.state = {
            message: null,
            modalVisible: false,
            username: null,
            password: null,
            rememberme: false,
            workOrderRequests: [
                { id: 1, num: '742654351', desc: 'Dryer, Whirlpool / Electric', location: 'Sanger TX, 76266-7558'},
                { id: 1, num: '555555555', desc: 'Air Conditioning, Mitsubishi / Electric', location: 'Sanger TX, 76266-7558'},
                { id: 1, num: '70456596', desc: 'Heating and ductwork, Mitsubishi / Electric', location: 'Sanger TX, 76266-7558'},
            ],
            messages: [
                { text: 'Work order # {} has been accepted and has a "pending" status. Please contact the customer to confirm the appointment date and time.', styles: ToastStyles.success },
                { text: 'WARNING', styles: ToastStyles.warning },
                { text: 'The username of password you entered was incorrect. Please try again.', styles: ToastStyles.error }
              ]
        };

    }
    
    _showAlert(msg) {
      this.setState({ message: { text: msg, styles: ToastStyles.warning, duration: 10000, height: 200 } });
    }

    render () {
       
        const {navigate} = this.props.navigation;
        
        var displayWorkOrders = this.state.workOrderRequests.map((item, key) => 
        <View style={[{margin:5},{height:50}]}>
            <Text>{item.desc}</Text>
        </View>
        );
    
        return (
            <SafeAreaView >
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <ScrollView>
                    <View style={styles.containerInner}>
                            <Text style={styles.title}>Total of {this.state.workOrderRequests.length} Workorder Requests</Text>

                            {displayWorkOrders}
                       </View>
                    </ScrollView>  
                        
                </View>
                <Toaster message={this.state.message} />
            </SafeAreaView>
        );
    }
}
