import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { colors  } from '../../styles/index.style';

const buttonstyles = StyleSheet.create({
  buttonText: {
    color: colors.white,
    //fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonView: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: 15,
    backgroundColor: colors.chwDarkBlue
  },
  buttonViewDisabled: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: 15,
    backgroundColor: colors.chwDisabledButton
  }
});

_disabled = () => {
  console.log('button disabled');
}

const PrimaryButton = ({
  onPress,
  text,
  enabled
}) => (
  <TouchableOpacity onPress={enabled ? onPress : _disabled}>
    <View style={enabled ? buttonstyles.buttonView : buttonstyles.buttonViewDisabled}>
      <Text style={buttonstyles.buttonText}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired
};

PrimaryButton.defaultProps = {
  onPress: () => {},
  text: '',
  enabled: true
};

export default PrimaryButton;
