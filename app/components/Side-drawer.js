import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableHighlight, Image, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import  {Icon} from 'native-base';
import Button from 'react-native-button';
export default class SideDrawer extends Component {
  render () {
    return (
      <View style={sidebar.container}>
        <View style={sidebar.secondaryContainer}>
          <View
            style={[{flex:1,borderBottomWidth : (Platform.OS ==='ios') ? 0: 1}, sidebar.actionsContainer]}>
            <View style={sidebar.profile}>
              <View style={sidebar.profileContainer}>
              <Image resizeMode={'contain'} source={require('../../assets/sing-logo.png')} style={sidebar.profilePicture} />
           </View>
            </View>
          </View>
          <View style={sidebar.menu}>
            <Button onPress={()=>Actions.replace('home')}>
              <View style={sidebar.button}>
                <Icon name='home' style={sidebar.menuItem} />
                <Text style={sidebar.menuItem}> Home</Text>
              </View>
            </Button>
            <Button onPress={Actions.volunteer}>
              <View style={sidebar.button}>
                <Icon type="FontAwesome" name='users' style={sidebar.menuItem} />
                <Text style={sidebar.menuItem}> Volunteer (Vote A Must)</Text>
              </View>
            </Button>
            <Button onPress={Actions.about}>
              <View style={sidebar.button}>
                <Icon type="FontAwesome" name='info' style={sidebar.menuItem} />
                <Text style={sidebar.menuItem}> About Us</Text>
              </View>
            </Button>
            </View>
        </View>
        <View style={{flex:0.2, justifyContent:'flex-end', alignItems:'center', marginBottom:20}}>
          <Text style={[sidebar.menuItem, {fontStyle:'italic', fontSize:14}]}>Developed by The Sing Foundation</Text>
        </View>
      </View>
    )
  }
}

const sidebar = {
  secondaryContainer:{
    fontSize: 18,
    fontFamily:(Platform.OS === 'ios') ? 'verdana' : 'sans-serif',
    flex:1,
  },
  container:{
    flex:1,
    backgroundColor:'#004D40',
  },
  profile:{
    flex:1,
    borderWidth:1,
    flexDirection:'row',
    borderColor:'white',
    backgroundColor:'white',
    justifyContent:'flex-start',
    alignItems:'center',
    shadowColor:'#000000',
    shadowOffset:{width: 1, height: 1},
    shadowOpacity:0.5,
    shadowRadius:5,
  },
  line:{
    justifyContent:'flex-end',
    alignItems:'center',
    borderTopWidth:3,
  },
  menu:{
    flex:4,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginTop:10,
  },
  profileContainer:{
    flex:1,
     borderColor:'transparent',
     borderWidth:2,
     justifyContent:'center',
     alignItems:'center'
  },
  home:{
    margin: (Platform.OS === 'ios') ? 15 : 10,
    resizeMode: 'contain',
    width: 30,
    height: 30,
    alignItems:'flex-end',
  },
  profilePicture:{
    width:300,
    borderColor:'transparent',
    flex:1,
    borderWidth:3,
  },
  menuItem:{
    fontSize:20,
    color:'white',
  },
  button:{
    padding:10,
    flexDirection:'row'
  }
}
