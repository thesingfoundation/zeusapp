import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Firebase} from '../../helpers/Firebase';
type Props = {};

export default class Index extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selected1: undefined,
      selected2:undefined,
      selected3:undefined,
      states_array:[],
      wards:[],
      lgas:[],
      loading:true
    };
    this.statesRef = firebase.database().ref().child('states')
    this.lgaRef = firebase.database().ref().child('lgas')
    this.wardsRef = firebase.database().ref().child('wards')
    this.states = []
    this.lgas = []
    this.wards = []
  }
  componentDidMount () {
    this.statesRef.once('value', (states)=> {
      states.forEach((current_state)=> {
        this.states.push({key:current_state.key, name:current_state.val().name})
      })
      this.setState({states_array:this.states, loading:false})
    })
  }
  onValueChange1(value: string) {
   if (value !== undefined) {
     this.setState(prev => ({
       selected1: value,
       loadingLgas:true
     }));
     this.lgaRef.child(value).once('value', (lgas)=> {
       lgas.forEach((lga) => {
         this.lgas.push({name:lga.val().name, key:lga.key})
       })
       this.setState({lgas:this.lgas, loadingLgas:false})
     })
   }
 }
  onValueChange2(value: string) {
   if (value !== undefined) {
     this.setState(prev => ({
       selected2: value,
       loadingWards:true
     }));
     this.wardsRef.child(value).once('value', (wards)=> {
       wards.forEach((ward)=> {
         this.wards.push({name:ward.val().name, key:ward.key})
       })
       this.setState({wards:this.wards, loadingWards:false})
     })
   }
 }
  onValueChange3(value: string) {
   this.setState(prev => ({
     selected3: value
   }));
 }
  loadNext = () => {
    this.setState(prev => ({selected1:undefined, selected2:undefined, selected3:undefined}))
    return Actions.units({wardId:this.state.selected3, stateId:this.state.selected1,lgaId:this.state.selected2})
  }
  render() {
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#FF9800'}}>
        <Left>
          <Button transparent onPress={()=>Actions.pop()}>
            <Icon style={{color:'white'}} name='arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white'}}>Select...</Title>
        </Body>
        <Right>
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
          {this.state.loading ? <Spinner color='green' /> : <Item picker style={{borderBottomWidth:0, justifyContent:'center', alignItems:'center'}}>
             <Picker
               mode="dropdown"
               iosIcon={<Icon name="ios-arrow-down-outline" />}
               style={{width:350, borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4, marginTop:10, marginBottom:20}}
               placeholder="Select..."
               placeholderStyle={{ color: "#FF9800" }}
               placeholderIconColor="#007aff"
               selectedValue={this.state.selected1}
               onValueChange={this.onValueChange1.bind(this)}
             >
               <Picker.Item label="Choose One" value={undefined} />
               {this.state.states_array.map((current_state, key)=>
                 <Picker.Item key={key} label={current_state.name} value={current_state.key} />
               )}
             </Picker>
           </Item>}
           {this.state.selected1 !== undefined && <View>
             <View style={{textAlign:'center', justifyContent:'center', flexDirection:'row', marginTop:20}}>
               <Text style={{fontSize:20, color:'#616161'}}>
                  Local Government Area:
               </Text>
             </View>
              {this.state.loadingLgas ? <Spinner color='green' /> : <Item picker style={{borderBottomWidth:0, justifyContent:'center', alignItems:'center'}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width:350, borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4,  marginTop:20, marginBottom:20}}
                  placeholder="Select..."
                  placeholderStyle={{ color: "#FF9800" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Choose One" value={undefined} />
                  {this.state.lgas.map((lga)=>
                    <Picker.Item key={lga.key} label={lga.name} value={lga.key} />
                  )}
                </Picker>
              </Item>}
           </View>}

           {this.state.selected2 !== undefined && <View>
             <View style={{textAlign:'center', justifyContent:'center', flexDirection:'row', marginTop:20}}>
               <Text style={{fontSize:20,color:'#616161'}}>
                  Ward:
               </Text>
             </View>
              {this.state.loadingWards ? <Spinner color='green' /> : <Item picker style={{borderBottomWidth:0, justifyContent:'center', alignItems:'center'}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width:350, borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4,  marginTop:20, marginBottom:20}}
                  placeholder="Select..."
                  placeholderStyle={{ color: "#FF9800" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected3}
                  onValueChange={this.onValueChange3.bind(this)}
                >
                  <Picker.Item label="Choose One" value={undefined} />
                  {this.state.wards.map((ward)=>
                    <Picker.Item key={ward.key} label={ward.name} value={ward.key} />
                  )}
                </Picker>
              </Item>}
           </View>}
        </Form>
            </Card>
            {this.state.selected3 !== undefined && <View style={styles.button}>
              <Button onPress={this.loadNext} rounded warning>
              <Text style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Continue</Text>
            </Button>
          </View>}


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
