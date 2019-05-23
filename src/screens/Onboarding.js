import React from 'react';
import { Platform, Image, Modal, TouchableHighlight, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import PrimaryButton from '../components/buttons/PrimaryButton';
import styles, { colors, viewportHeight } from '../styles/index.style';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { terms } from '../../assets/html/terms_of_service';
export default class OnboardingScreen extends React.Component {
    
    static navigationOptions = {
        header: null
      }
    state = {
        modalVisible: false,
        termsModal: false,
    };
    constructor (props) {
        super(props);
    }
    setModalVisible(visible, terms) {
        this.setState({termsModal: terms});
        this.setState({modalVisible: visible});
      }
    
    _goToLogin() {
      Actions.login();
    }
    render () {
        return (
            <SafeAreaView>
                <View>
                    <StatusBar
                      translucent={false}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    <View>
                      <LinearGradient colors={[colors.white, colors.chwGradientBlue]} style={[{height:viewportHeight}]} >
                        <View style={[styles.logoContainer]}>
                          <Image resizeMode="contain" source={require('../../assets/images/logo.png')} style={styles.logoSmall}/>
                        </View>
                        <View style={[styles.containerInner,{flex:1}]}>
                          <Text style={styles.title}>Welcome to Choice Home Warranty</Text>
                          <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et nibh nec mi dapibus faucibus vel vitae nisi. Nullam ut urna accumsan, auctor metus sit amet, condimentum dui.</Text>
                        </View>
                        
                        <View style={[styles.containerInner,{flex:0}]}>
                        
                          <PrimaryButton
                            onPress={() => this._goToLogin()}
                            text="Login"/>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:25 }}>
                              <Text style={styles.smallText}>By pressing "Login" button above, I aknowledge I have read and agree to the <Text style={[{color: colors.chwBlue},{fontWeight:'bold'}]} onPress={() => {this.setModalVisible(!this.state.modalVisible, true);}}>Terms of Use</Text> and <Text style={[{color: colors.chwBlue},{fontWeight:'bold'}]} onPress={() => {this.setModalVisible(!this.state.modalVisible, false);}}>Privacy Policy</Text></Text>
                            </View>
                        </View>
                      </LinearGradient>
                    </View>  
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => { }}
                      >
                      <View style={styles.modal}>
                        {this.state.termsModal ? (
                          <View>
                            <View>
                                <Text style={styles.modalTitle}>Terms of Use</Text>
                                <TouchableHighlight
                            onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.modalTitle}>X</Text>
                            </TouchableHighlight>
                            </View>
                              <WebView originWhitelist={['*']} 
                              source={{html:''}}
                              />
                           
                              
          
                          </View>
                        ): (
                          <View>
                            <View>
                                <Text style={styles.modalTitle}>Privacy Policy</Text>
                                <TouchableHighlight
                            onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.modalTitle}>X</Text>
                          </TouchableHighlight>
                            </View>
                            <ScrollView>
                                <Text style={styles.modalText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere venenatis mauris, eu elementum mi maximus eu. Etiam ultricies ullamcorper mauris vel interdum. Nullam pellentesque, magna nec tempor euismod, nulla diam faucibus nulla, quis sodales ante lorem eget est. Vivamus dignissim neque eu nisl eleifend convallis. Maecenas ut sapien iaculis, porta purus ac, consectetur elit. Proin lacinia libero ipsum, vel hendrerit dolor vulputate vel. Proin et sem non lacus interdum auctor. Etiam imperdiet libero id ex congue, id mattis risus eleifend. Vestibulum a nunc a justo molestie bibendum vel non urna. Sed pulvinar, elit vel ultricies tempus, enim tellus bibendum enim, vitae pellentesque velit dui sed est. Pellentesque at tristique nisl, at elementum ex. Cras a convallis lectus.
                                </Text>
                                <Text style={styles.modalText}>
                                    Donec sollicitudin felis ullamcorper ante convallis tempor. In erat augue, aliquam ut faucibus in, vestibulum sit amet ipsum. Aenean vel elementum massa, sit amet tincidunt quam. Etiam venenatis faucibus aliquet. Vivamus faucibus ultricies magna. Mauris leo purus, molestie at ipsum eget, ultrices placerat elit. Curabitur quis mattis mauris. Praesent tempor ante eu auctor venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec feugiat leo libero, dapibus imperdiet lacus interdum id. Integer sit amet ligula venenatis, euismod metus et, convallis elit. Nullam sit amet iaculis dui. Sed ipsum arcu, scelerisque non posuere sed, porttitor et nunc.
                                </Text>
                                <Text style={styles.modalText}>
                                    Praesent ligula nisi, sagittis a lectus bibendum, condimentum mollis lacus. Nunc nibh odio, porta sit amet vehicula eu, mollis vel purus. Pellentesque nec libero eu lectus aliquam egestas. Aliquam eget condimentum diam. Etiam sed tellus vitae sem dapibus consequat. Aenean nec ante molestie, faucibus est posuere, placerat ipsum. Aliquam erat volutpat. Fusce id pellentesque libero.
                                </Text>
                            </ScrollView>
                          </View>
                        )}
                       </View>
                    </Modal>     
                </View>
            </SafeAreaView>
        );
    }
}
