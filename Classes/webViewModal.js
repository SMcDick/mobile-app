/**
 * Created by chicmic on 17/02/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
    WebView,
    Modal,
    Dimensions,
    Animated
} from 'react-native';

let screenWidth=Dimensions.get('window').height;
let screenHeight=Dimensions.get('window').width;

export default class WebViewModal extends Component{
    constructor(props){
        super(props);
        this.state={
            showFBAFullScreen:false,
            expandFBAOffersValue: new Animated.Value(0),
            positionYOfFBAOffersPage:new Animated.Value(screenHeight),
            heightOfFBaOffersPage:new Animated.Value(screenHeight/2)
        }
    }

    closeWebView(){
        Animated.timing(
            this.state.positionYOfFBAOffersPage,
            {
                toValue:0,
                duration:400
            }
        ).start();
    }

    expandCollapseWebView(webViewIsFullScreen,url){
        if(url)
            this.setState({productOffersPageURL:url})

        if(webViewIsFullScreen){
            Animated.timing(
                this.state.positionYOfFBAOffersPage,
                {
                    toValue:-screenHeight,
                    duration:200
                }

            ).start();

            Animated.timing(
                this.state.heightOfFBaOffersPage,
                {
                    toValue:screenHeight,
                    duration:200
                }
            ).start()

            this.setState({showFBAFullScreen:webViewIsFullScreen})


        }else{
            Animated.timing(
                this.state.positionYOfFBAOffersPage,
                {
                    toValue:-screenHeight/2,
                    duration:200
                }
            ).start();

            Animated.timing(
                this.state.heightOfFBaOffersPage,
                {
                    toValue:screenHeight/2,
                    duration:200
                }
            ).start()

            this.setState({showFBAFullScreen:webViewIsFullScreen})

        }



    }
    render(){
        return(
            <Animated.View style= {{width:screenWidth,height:this.state.heightOfFBaOffersPage, transform:[{translateY:this.state.positionYOfFBAOffersPage}]}}>
                <WebView
                    source={{uri: this.state.productOffersPageURL}}
                />
                <TouchableOpacity style={{height:40,width:60,backgroundColor:'skyblue',position:'absolute',marginLeft:screenWidth-70,marginTop:3,justifyContent:'center',alignItems:'center'}}
                                  onPress={this.expandCollapseWebView.bind(this,this.state.showFBAFullScreen?false:true,null)}
                >
                    <Text>{this.state.showFBAFullScreen?"Collapse":"Expand"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:40,width:60,backgroundColor:'skyblue',position:'absolute',marginLeft:screenWidth-70,marginTop:50,justifyContent:'center',alignItems:'center'}}
                                  onPress={()=>this.closeWebView()}
                >
                    <Text>Close</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

}
