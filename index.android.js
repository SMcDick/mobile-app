/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
  Alert,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import BarcodeScanner from 'react-native-barcode-scanner-universal'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */




import MainClass from './Classes/MainClass'

AppRegistry.registerComponent('BarCodeScanner', () => MainClass);
