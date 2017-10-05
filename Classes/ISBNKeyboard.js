import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import { register, insertText, backSpace,submit } from 'react-native-custom-keyboard';

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
<View>

        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onPress.bind(this,"1")}>
              <Text style={{color:'black'}}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"2")}>
              <Text style={{color:'black'}}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"3")}>
              <Text style={{color:'black'}}>3</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onPress.bind(this,"4")}>
              <Text style={{color:'black'}}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"5")}>
              <Text style={{color:'black'}}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"6")}>
              <Text style={{color:'black'}}>6</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onPress.bind(this,"7")}>
              <Text style={{color:'black'}}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"8")}>
              <Text style={{color:'black'}}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"9")}>
              <Text style={{color:'black'}}>9</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onPress.bind(this,"X")}>
              <Text style={{color:'black'}}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"0")}>
              <Text style={{color:'black'}}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"978")}>
              <Text style={{color:'black'}}>978</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onPress.bind(this,"submit")}>
              <Text style={{color:'black'}}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPress.bind(this,"bs")}>
              <Text style={{color:'black'}}>backspace</Text>
            </TouchableOpacity>
        </View>
      </View>

    );
  }
}

register('hello', () => MyKeyboard);