import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Share} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Fab, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Firebase} from '../../helpers/Firebase';
type Props = {};
export default class Home extends Component<Props> {
  constructor(props) {
   super(props);
   this.state = {
     selected2: undefined,
     active:false,
     states:[],
     loading:true
   };
   this.states = []
   this.ref = firebase.database().ref().child('stats')
 }
 componentDidMount () {
   this.ref.once('value', (states)=> {
     states.forEach((current_state)=> {
       this.states.push({
         name:current_state.val().name,
         election:current_state.val().election,
         preelection:current_state.val().preelection,
         postelection:current_state.val().postelection,
          key:current_state.key})
     })
     this.setState({states:this.states, loading:false})
   })
 }
 shareApp = () => {
   Share.share({message:"Hello, I have downloaded the Sing Foundation Election Violence Monitoring App, and I am excited to share it with you. Download it to view and report election violence in areas near you.", title:"Sing Foundation App"})
 }
 showPageContent () {
   return (
     <View style={styles.body}>
       {this.states.map((current_state)=>
         <Card key={current_state.key}>
           <View style={styles.state_container}>
             <Text style={styles.state_header}>
                {current_state.name}
             </Text>
           </View>
           <View style={{padding:10}}>
             <Text style={styles.state_item}>Pre-election: {current_state.preelection}</Text>
             <Text style={styles.state_item}>Election Day: {current_state.election}</Text>
             <Text style={styles.state_item}>Post Election: {current_state.postelection}</Text>
           </View>
           <View style={styles.state_container}>
             <Text style={styles.state_total} >
                Total: {current_state.preelection + current_state.election + current_state.postelection}
             </Text>
           </View>
         </Card>
       )}
     </View>
   )
 }
  render() {
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#FF9800'}}>
        <Left>
          <Button onPress={Actions.drawerOpen} transparent>
            <Icon style={{color:'white'}} name='menu' />
          </Button>
        </Left>
        <Body >
          <Title style={{color:'white'}}>Home</Title>
        </Body>
        <Right>
          <Button onPress={this.shareApp} transparent>
            <Icon style={{color:'white'}} name='share' />
          </Button>
        </Right>
      </Header>
      <ScrollView>
        <View>
          <View style={{flex:0.5, justifyContent:'center', alignItems:'center', padding:10}}>
            <Text style={styles.header}>Incident Reports</Text>
          </View>
          {this.state.loading ? <View style={styles.body}><Spinner color='green' /></View> : this.showPageContent()}

        </View>
      </ScrollView>
      <View style={{flex:0.5, }}>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#009688' }}
            position="bottomRight"
            onPress={Actions.index}>
            <Icon name="mail" />
          </Fab>
      </View>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header:{
    fontSize:40,
    fontWeight:'700'
  },
  body:{
    flex:2,
    margin:10,
  },
   button:{
     flex:1,
     textAlign:'center',
     justifyContent:'center',
     flexDirection:'row',
     marginTop:20,
     color:'white',
   },
   state_header: {
     fontSize:20,
     fontWeight:'600'
   },
   state_container: {
     textAlign:'center',
     justifyContent:'center',
     flexDirection:'row',
     marginTop:10,
   },
   state_item: {
     fontSize:16,
   },
   state_total: {
     fontSize:16,
     padding:5,
     fontStyle:'italic'
   }
});
