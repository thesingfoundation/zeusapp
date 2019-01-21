import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Input, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Firebase} from '../../helpers/Firebase';
export default class Units extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      units:[],
      loading:true
    }
    this.unitsRef = firebase.database().ref().child('polling_units')
    this.units = []
  }
  componentDidMount () {
    this.unitsRef.child(this.props.wardId).once('value', (units)=> {
      units.forEach((unit)=> {
        this.units.push({
          name:unit.val().name,
          unitId:unit.val().unitId,
          reports:unit.val().reports,
          key:unit.key})
      })
      this.setState({units:this.units, loading:false})
    })
  }
  renderItem = ({item, index}) => {
    return(
      <View key={item.key} style={{ borderBottomWidth:1, borderColor:'grey' }}>
        <View style={{margin:10,flexDirection:'row', flex:1, justifyContent:'space-between', marginTop:10,}}>
          <Text style={{marginTop:15}}>{index+1}. &nbsp;{item.unitId}</Text>
          <Text style={{marginTop:15}}>Reports: {item.reports}</Text>
          <Button onPress={()=>Actions.reports({unitKey:item.key, stateId:this.props.stateId, wardId:this.props.wardId, lgaId:this.props.lgaId})} success>
          <Text  style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Report</Text>
        </Button>

        </View>

      </View>
    )
  }
  searchText (text) {
    if (text === '') {
      this.setState({units:this.units})
    }else{
      let units = this.units.filter((unit)=> unit.unitId.toLowerCase().includes(text.toLowerCase()))
      if (units.lenght > 0) {
        this.setState({units})
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#FF9800'}}>
        <Left>
          <Button onPress={()=>Actions.pop()} transparent>
            <Icon style={{color:'white'}} name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white'}}>Polling Units</Title>
        </Body>
        <Right>

        </Right>
      </Header>
      <View style={styles.body}>
        <Item style={{borderWidth:2, borderRadius:10, borderColor:'blue',}}>
            <Input onChangeText={(text)=>this.searchText(text)} placeholder="Search" style={{borderWidth:2, borderRadius:10, borderColor:'#E0E0E0',textAlign:'center', justifyContent:'center' }}/>
          </Item>
          {this.state.loading ? <Spinner color='green' /> : <FlatList
            data={this.state.units}
            renderItem={this.renderItem}
          />}
      </View>
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
