import React from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import styles, { viewportHeight } from '../styles/index.style';
import { connect } from 'react-redux';

//Map the redux state to your props.
const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
})
  
//Map your action creators to your props.
const mapDispatchToProps = {
}

class VTTermsScreen extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { user, loading } = this.props;

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
                            <Text style={[styles.modalTitle]}>Terms of Service</Text>
                            <Text style={styles.modalText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere venenatis mauris, eu elementum mi maximus eu. Etiam ultricies ullamcorper mauris vel interdum. Nullam pellentesque, magna nec tempor euismod, nulla diam faucibus nulla, quis sodales ante lorem eget est. Vivamus dignissim neque eu nisl eleifend convallis. Maecenas ut sapien iaculis, porta purus ac, consectetur elit. Proin lacinia libero ipsum, vel hendrerit dolor vulputate vel. Proin et sem non lacus interdum auctor. Etiam imperdiet libero id ex congue, id mattis risus eleifend. Vestibulum a nunc a justo molestie bibendum vel non urna. Sed pulvinar, elit vel ultricies tempus, enim tellus bibendum enim, vitae pellentesque velit dui sed est. Pellentesque at tristique nisl, at elementum ex. Cras a convallis lectus.
                            </Text>
                            <Text style={styles.modalText}>
                                Donec sollicitudin felis ullamcorper ante convallis tempor. In erat augue, aliquam ut faucibus in, vestibulum sit amet ipsum. Aenean vel elementum massa, sit amet tincidunt quam. Etiam venenatis faucibus aliquet. Vivamus faucibus ultricies magna. Mauris leo purus, molestie at ipsum eget, ultrices placerat elit. Curabitur quis mattis mauris. Praesent tempor ante eu auctor venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec feugiat leo libero, dapibus imperdiet lacus interdum id. Integer sit amet ligula venenatis, euismod metus et, convallis elit. Nullam sit amet iaculis dui. Sed ipsum arcu, scelerisque non posuere sed, porttitor et nunc.
                            </Text>
                            <Text style={styles.modalText}>
                                Praesent ligula nisi, sagittis a lectus bibendum, condimentum mollis lacus. Nunc nibh odio, porta sit amet vehicula eu, mollis vel purus. Pellentesque nec libero eu lectus aliquam egestas. Aliquam eget condimentum diam. Etiam sed tellus vitae sem dapibus consequat. Aenean nec ante molestie, faucibus est posuere, placerat ipsum. Aliquam erat volutpat. Fusce id pellentesque libero.
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VTTermsScreen);
