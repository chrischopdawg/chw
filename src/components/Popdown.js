import React from 'react';
import { colors } from '../styles/index.style';
import { Text, Animated} from 'react-native';

export default class PopdownComponent extends React.Component {
    constructor(props) {
      super(props);

      const charCount = this.props.message.message.length;
      const lines = Math.ceil(charCount / 45) + 1;
      const height = lines < 3 ? 100 : lines * 25;

      this.state = {
        bounceValue: new Animated.Value(-100),
        backgroundColor: this.props.message.type == "success" ? colors.chwSuccessBackground : colors.chwErrorBackground,
        height: height,
        message: this.props.message
      };
  
      //console.log(this.props);
      
      if(this.props.message.showPopdown) {
        //console.log('show pop down');
        Animated.spring(
          this.state.bounceValue,
          {
            toValue: 0,
            velocity: 3,
            tension: 2,
            friction: 8,
          }
        ).start();
    
        setTimeout(() => {
          //console.log('timeout');
          Animated.spring(
            this.state.bounceValue,
            {
              toValue: -height,
              velocity: 3,
              tension: 2,
              friction: 8,
            }
          ).start(() => this.props.endFunction());
        }, 5000);
      }
    }
  
    render() {
      return (  
        <Animated.View style={[{paddingHorizontal:25},{paddingVertical:20},{height:this.state.height},{backgroundColor:this.state.backgroundColor},{position:'absolute'},{zIndex:10000},{width:'100%'},{top:0},{transform: [{translateY: this.state.bounceValue}]}]}>
            <Text style={[{color:colors.white}]}>{this.state.message.message}</Text>
        </Animated.View>
        
      )
    }
  }