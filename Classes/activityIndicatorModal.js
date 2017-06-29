/**
 * Created by chicmic on 24/04/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Switch,
    ProgressViewIOS,
    TouchableHighlight,
    ProgressBarAndroid,
    Platform,
    Modal,
    ActivityIndicator,
    InteractionManager
} from 'react-native';

export default class AIModal extends Component {

    constructor(){
        super()
        this.state = {
            showModal : true
        }
    }

    componentWillMount(){
        this.setState({showModal : this.props.showModal})
    }
    render(){
        return(
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.showModal}
            >
                <View
                    style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(100,100,100,0.5)'}}
                >
                    <ActivityIndicator
                        size={'large'}
                        color="rgb(0,149,242)"
                        //style={{color:'red'}}
                        //color={{color:'red'}}
                        //color={{'rgb(50,50,50')}}
                    />
                </View>
            </Modal>
        )
    }
}