import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker } from 'native-base';

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
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white'}}>Select...</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
      <View style={{flex:0.5, }}></View>
      <View style={styles.body}>
        <Card>
          <View style={{textAlign:'center', justifyContent:'center', flexDirection:'row', marginTop:10}}>
            <Text style={{fontSize:20,  color:'#616161'}}>
               State:
            </Text>
          </View>
          <Form>
           <Item picker style={{borderBottomWidth:0}}>
             <Picker
               mode="dropdown"
               iosIcon={<Icon name="ios-arrow-down-outline" />}
               style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4, marginTop:10}}
               placeholder="Select..."
               placeholderStyle={{ color: "#FF9800" }}
               placeholderIconColor="#007aff"
               selectedValue={this.state.selected2}
               onValueChange={this.onValueChange2.bind(this)}
             >
               <Picker.Item label="Abia" value="key0" />
               <Picker.Item label="Adamawa" value="key1" />
               <Picker.Item label="Akwa-Ibom" value="key2" />
               <Picker.Item label="Anambra" value="key3" />
               <Picker.Item label="Bauchi" value="key4" />
             </Picker>
           </Item>

         <View style={{textAlign:'center', justifyContent:'center', flexDirection:'row', marginTop:20}}>
           <Text style={{fontSize:20, color:'#616161'}}>
              Local Government Area:
           </Text>
         </View>

          <Item picker style={{borderBottomWidth:0}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4,  marginTop:20}}
              placeholder="Select..."
              placeholderStyle={{ color: "#FF9800" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Abia" value="key0" />
              <Picker.Item label="Adamawa" value="key1" />
              <Picker.Item label="Akwa-Ibom" value="key2" />
              <Picker.Item label="Anambra" value="key3" />
              <Picker.Item label="Bauchi" value="key4" />
            </Picker>
          </Item>

          <View style={{textAlign:'center', justifyContent:'center', flexDirection:'row', marginTop:20}}>
            <Text style={{fontSize:20,color:'#616161'}}>
               Ward:
            </Text>
          </View>

           <Item picker style={{borderBottomWidth:0}}>
             <Picker
               mode="dropdown"
               iosIcon={<Icon name="ios-arrow-down-outline" />}
               style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4,  marginTop:20, marginBottom:20}}
               placeholder="Select..."
               placeholderStyle={{ color: "#FF9800" }}
               placeholderIconColor="#007aff"
               selectedValue={this.state.selected2}
               onValueChange={this.onValueChange2.bind(this)}
             >
               <Picker.Item label="Abia" value="key0" />
               <Picker.Item label="Adamawa" value="key1" />
               <Picker.Item label="Akwa-Ibom" value="key2" />
               <Picker.Item label="Anambra" value="key3" />
               <Picker.Item label="Bauchi" value="key4" />
             </Picker>
           </Item>
        </Form>
            </Card>
            <View style={styles.button}>
              <Button rounded warning>
              <Text style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Continue</Text>
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

  },
  body:{
    flex:2,
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
