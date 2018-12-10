import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Textarea, Content } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Firebase} from '../../helpers/Firebase';
type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
   super(props);
   this.state = {
     selected2: undefined
   };
 }
 onValueChange2(value: string) {
   this.setState({
     selected2: value
   });
 }
  render() {
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#FF9800'}}>
        <Left>
          <Button transparent onPress={Actions.units}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white', fontSize:18}}>Category</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <View>

      </View>
      <View style={{flex:0.2, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10}}>
        <Text style={{fontSize:18,color:'#424242' }}> Select an Category</Text>
      </View>
      <View style={styles.body}>


          <Form>
           <Item picker style={{borderBottomWidth:0}}>
             <Picker
               mode="dropdown"
               iosIcon={<Icon name="ios-arrow-down-outline" />}
               style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4, }}
               placeholder="Select..."
               placeholderStyle={{ color: "#FF9800" }}
               placeholderIconColor="#007aff"
               selectedValue={this.state.selected2}
               onValueChange={this.onValueChange2.bind(this)}
             >
               <Picker.Item label="Pre-Election" value="key0" />
               <Picker.Item label="Election" value="key1" />
               <Picker.Item label="Post-Election" value="key2" />

             </Picker>
           </Item>
        </Form>
        <View style={{flex:0.2, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15}}>
          <Text style={{fontSize:18, color:'#424242'}}> Comments</Text>
        </View>
        <Form>
            <Textarea rowSpan={10} bordered placeholder="" />
          </Form>

            <View onPress={Actions.camera} style={{flex:0.2, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:15}}>
              <Text onPress={Actions.camera} style={{fontSize:18, color:'#64B5F6'}}> Take a Picture/Video&nbsp;&nbsp;</Text>
              <Icon onPress={Actions.camera} name='camera' style={{color:'#64B5F6', }} />
            </View>



            <View style={styles.button}>
              <Button  warning>
              <Text style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Report</Text>

            </Button>
            </View>


      </View>
      <View style={{flex:0.5, }}></View>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',

  },
  body:{
    flex:3,
    margin:10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
   button:{
     flex:1,
     textAlign:'center',
     justifyContent:'center',
     flexDirection:'row',
     marginTop:20,
     color:'white',
   },
});
