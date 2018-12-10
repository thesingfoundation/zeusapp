import React, {Component} from 'react';
import {View, WebView, StyleSheet, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {Actions} from 'react-native-router-flux';
export default class About extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <Header style={{backgroundColor:'#FF9800'}}>
          <Left>
            <Button transparent onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body >
            <Title style={{color:'white'}}>About Us</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <WebView
          source={{uri: 'https://sing.org.ng/about-us/'}}
        />
      </View>
    )
  }
}
