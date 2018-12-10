import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Input } from 'native-base';
import {Actions} from 'react-native-router-flux';
export default class App extends Component<Props> {
  renderItem({item, index}) {
    return(
      <View style={{ borderBottomWidth:1, borderColor:'grey' }}>
        <View style={{margin:10,flexDirection:'row', flex:1, justifyContent:'space-between', marginTop:10,}}>
          <Text style={{marginTop:15}}>1. &nbsp;PU: 06/03/03/005</Text>
          <Text style={{marginTop:15}}>Reports: 600</Text>
          <Button onPress={Actions.reports} success>
          <Text  style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Report</Text>
        </Button>

        </View>

      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#FF9800'}}>
        <Left>
          <Button onPress={Actions.index} transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white'}}>Polling Units</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
      <View style={styles.body}>
        <Item style={{borderWidth:2, borderRadius:10, borderColor:'blue',}}>
            <Input placeholder="Search" style={{borderWidth:2, borderRadius:10, borderColor:'#E0E0E0',textAlign:'center', justifyContent:'center' }}/>
          </Item>
          <FlatList
            data={[{key: 'a'},{key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'},{key: 'f'}]}
            renderItem={this.renderItem}
          />
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

    flex:1,
    marginTop:10,
    marginBottom:10,
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
