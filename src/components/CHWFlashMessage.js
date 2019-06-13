import React from 'react';
import { connect } from 'react-redux';

//import FlashMessage, { showMessage } from 'react-native-flash-message';

const mapStateToProps = state => ({
    //auth: state.auth,
    message: state.message,
    loading: state.loading,
    ref: state.ref,
})
  
const mapDispatchToProps = {
    // If we needed reducers, they would go here.
}

class CHWFlashMessage extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor (props) {
        super(props);
    }
    _showMessage(messageOptions) {
        console.log('show a message ', messageOptions);
        setTimeout(() => {
            showMessage(messageOptions);
        }, 200);
    
        return (
            <View ref={this.props.ref} position="top"></View>
        );
    }
    render () {
        const { loading, message, ref } = this.props;

        return (
            !loading && message ? (
                this._showMessage(message)
            ) : ( null )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CHWFlashMessage);
