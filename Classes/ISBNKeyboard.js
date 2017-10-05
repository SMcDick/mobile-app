import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { register, insertText, backSpace,submit } from 'react-native-custom-keyboard';
import FontAwesome, { Icons } from 'react-native-fontawesome'

let screenHeight = Dimensions.get('window').height*0.98;
let screenWidth = Dimensions.get('window').width;

class MyKeyboard extends Component {

  onPress = (value) => {
    if(value=='bs'){
        backSpace(this.props.tag);
    }
    else if(value=='submit'){
        insertText(this.props.tag, '\n');
    }
    else{
        insertText(this.props.tag, value);
    }
  };
  render() {
    return (
    <View style={{backgroundColor:'rgb(236,239,241)', height:screenHeight}}>
        <View style={{flexDirection:'row'}}>
            <View style={styles.keyBoardColumnStyle}>
                <TouchableOpacity onPress={this.onPress.bind(this,"submit")}>
                  <Text style={styles.keyBoardKeyStyle}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPress.bind(this,"1")}>
                  <Text style={styles.keyBoardKeyStyle}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPress.bind(this,"4")}>
                  <Text style={styles.keyBoardKeyStyle}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPress.bind(this,"7")}>
                  <Text style={styles.keyBoardKeyStyle}>7</Text>
                </TouchableOpacity>
            </View>
        <View style={styles.keyBoardColumnStyle}>
            <TouchableOpacity onPress={this.onPress.bind(this,"bs")}>
                <FontAwesome style={styles.keyBoardKeyStyle}>{Icons.eraser}</FontAwesome>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"2")}>
              <Text style={styles.keyBoardKeyStyle}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"5")}>
              <Text style={styles.keyBoardKeyStyle}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"8")}>
              <Text style={styles.keyBoardKeyStyle}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"0")}>
              <Text style={styles.keyBoardKeyStyle}>0</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.keyBoardColumnStyle}>
            <TouchableOpacity onPress={this.onPress.bind(this,"X")}>
              <Text style={styles.keyBoardKeyStyle}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"3")}>
              <Text style={styles.keyBoardKeyStyle}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"6")}>
              <Text style={styles.keyBoardKeyStyle}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"9")}>
              <Text style={styles.keyBoardKeyStyle}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"978")}>
              <Text style={styles.keyBoardKeyStyle}>978</Text>
            </TouchableOpacity>
        </View>
    </View>

  </View>

  );
 }
}

const styles = StyleSheet.create({
  keyBoardColumnStyle:{
    justifyContent:'flex-start',
    alignItems:'flex-end',
    padding:7,

  },
  keyBoardKeyStyle:{
    color:'black',
    fontSize:20,
    height:screenHeight*0.06,
    width:screenWidth*0.33,
    alignSelf:'center',
    paddingLeft:35


  },
 });

register('hello', () => MyKeyboard);