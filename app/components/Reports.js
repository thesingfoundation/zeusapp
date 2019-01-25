import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card,  Form, Item, Picker, Textarea, Content, Spinner } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Firebase} from '../../helpers/Firebase';
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, ref, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    const imageRef = ref
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
type Props = {};

export default class Reports extends Component<Props> {
  constructor(props) {
   super(props);
   this.state = {
     selected1:'',
     selected3:'',
     selected2: '',
     avatarSource:'',
     location:'',
     latitude:'',
     longitude:''
   };
   this.statsRef = firebase.database().ref().child('stats')
   this.unitsRef = firebase.database().ref().child('polling_units')
   this.reportsRef = firebase.database().ref().child('reports')
   this.reportCountRef = firebase.database().ref().child('report_count')
   this.lgaRef = firebase.database().ref().child('lgas')
  }
  async componentDidMount () {
    let location =  await AsyncStorage.getItem('location')
    let longitude = await AsyncStorage.getItem('longitude')
    let latitude = await AsyncStorage.getItem('latitude')
    this.setState({location, longitude, latitude})
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  onValueChange1(value: string) {
    this.setState({
      selected1: value
    });
  }
  onValueChange3(value: string) {
    this.setState({
      selected3: value
    });
  }
  handleImage = () => {
   const options = {
     title: 'Select Option',
     storageOptions: {
       skipBackup: true,
       path: 'images',
     },
   };
    ImagePicker.showImagePicker(options, (response) => {
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     } else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     } else {
       const source = { uri: response.uri };

       this.setState({
         avatarSource: source.uri,
       });
     }
   });
  }
  saveImage = () => {
    alert("Uploading image")
    const sessionId = new Date().getTime()
   var ref = firebase.storage().ref().child('reports').child('attachments').child(sessionId.toString())
   uploadImage(this.state.avatarSource, ref, 'image/jpeg').then(url => {
     this.saveForm(url)
   }).catch(error => console.log(error))
   }
  submitReport = () => {
    this.setState({loading:true})
    if (this.state.avatarSource !== '' && this.state.comments !== '') {
        this.saveImage()
      }else if (this.state.comments !== ''){
      this.saveForm('')
    }else{
      alert("Cannot make reports without a comment")
    }
    }
  saveForm (url) {
   var data = {
     attachment:url,
     comments:this.state.comments,
     report_type:this.state.selected2,
     actors:this.state.selected1,
     action_type:this.state.selected3,
     report_time:firebase.database.ServerValue.TIMESTAMP,
     polling_unit:this.props.unitKey,
     state:this.props.stateId,
     wardId:this.props.wardId,
     lgaId:this.props.lgaId,
     location:this.state.location,
     position:{longitude:this.state.longitude, latitude:this.state.latitude},
     false_report:false
   }
   this.statsRef.child(this.props.stateId).child(this.state.selected2).once('value', (reports)=>{
     reports.ref.set(reports.val() + 1)
   })
   this.unitsRef.child(this.props.wardId).child(this.props.unitKey).child('reports').once('value', (reports)=> {
     reports.ref.set(reports.val() + 1)
   })
   this.lgaRef.child(this.props.stateId).child(this.props.lgaId).child('reports').once('value', (reports)=>{//This saves more mb since it pointed down to a specific child and makess update
     if (reports.exists()){
     	reports.ref.set(reports.val() + 1)
     }else{
     	reports.ref.set(1)
     }
   })

   this.reportsRef.push(data, (error)=> {
     if (!error) {
       this.setState({loading:false})
       alert("Thank you for reporting, report details have been successfully saved")
       return Actions.home()
     }
   })
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
          <Title style={{color:'white', fontSize:18}}>Category</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <ScrollView>
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
                 <Picker.Item label="Choose One" value="" />
                 <Picker.Item label="Pre-Election" value="preelection" />
                 <Picker.Item label="Election" value="election" />
                 <Picker.Item label="Post-Election" value="postelection" />
               </Picker>
             </Item>
             <View style={{flex:0.2, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10}}>
               <Text style={{fontSize:18,color:'#424242' }}> Actors</Text>
             </View>
             <Item picker style={{borderBottomWidth:0}}>
               <Picker
                 mode="dropdown"
                 iosIcon={<Icon name="ios-arrow-down-outline" />}
                 style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4, }}
                 placeholder="Select..."
                 placeholderStyle={{ color: "#FF9800" }}
                 placeholderIconColor="#007aff"
                 selectedValue={this.state.selected1}
                 onValueChange={this.onValueChange1.bind(this)}
               >
                 <Picker.Item label="Choose One" value="" />
                 <Picker.Item label="Political Thugs" value="Political Thugs" />
                 <Picker.Item label="Law Enforcement Agents" value="Law Enforcement Agents" />
                 <Picker.Item label="Political Parties Agents/ Supporters" value="Party Agents/Supporters" />
                 <Picker.Item label="Community Members" value="Community Members" />
                 <Picker.Item label="Political Candidates" value="Candidates" />
               </Picker>
             </Item>
             <View style={{flex:0.2, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10}}>
               <Text style={{fontSize:18,color:'#424242' }}> Type</Text>
             </View>
             <Item picker style={{borderBottomWidth:0}}>
               <Picker
                 mode="dropdown"
                 iosIcon={<Icon name="ios-arrow-down-outline" />}
                 style={{ width: '80%', borderWidth:2, borderRadius:10, borderColor:'#E0E0E0', marginLeft:4, }}
                 placeholder="Select..."
                 placeholderStyle={{ color: "#FF9800" }}
                 placeholderIconColor="#007aff"
                 selectedValue={this.state.selected3}
                 onValueChange={this.onValueChange3.bind(this)}
               >
                 <Picker.Item label="Choose One" value="" />
                 <Picker.Item label="Ballot Snatching" value="Ballot Snatching" />
                 <Picker.Item label="Intimidation of Voters" value="Intimidation of Voters" />
               </Picker>
             </Item>
          </Form>
          <View style={{flex:0.5, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15}}>
            <Text style={{fontSize:18, color:'#424242'}}> Location</Text>
          </View>
          <View style={{flex:0.5, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15}}>
            <Text style={{fontSize:18, color:'red'}} >{this.state.location} </Text>
          </View>

          <View style={{flex:0.5, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15}}>
            <Text style={{fontSize:18, color:'#424242'}}> Comments</Text>
          </View>
          <Form>
              <Textarea onChangeText={(comments)=>this.setState({comments})} rowSpan={10} bordered placeholder="" />
          </Form>

              {this.state.avatarSource === '' &&
              <View  style={{flex:0.5, textAlign:'center',flexDirection:'row', justifyContent:'center', alignItems:'center', margin:15}}>
                  <Text onPress={this.handleImage} style={{fontSize:18, color:'#64B5F6'}}> Take a Picture/Video&nbsp;&nbsp; <Icon name='camera' style={{color:'#64B5F6', }} /></Text>
                </View>
              }
                {this.state.avatarSource !== '' &&
                <Image
                  style={{width: 150, height: 150}}
                    source={{uri: this.state.avatarSource}}
                   />}
              {this.state.selected2 !== '' && this.state.selected3 !== '' && this.state.selected1 !== '' && <View style={styles.button}>

           </View>}
        </View>
        <View style={{flex:0.5,justifyContent:'center', alignItems:'center' }}>
          {this.state.loading ? <Spinner color='green' /> :
          <View>
            {this.state.location !== '' && <Button onPress={this.submitReport}  warning>
             <Text style={{color:'white', padding: 20, paddingTop: 5, fontSize:18}}>Report</Text>
           </Button>}
          </View>}
        </View>
      </ScrollView>

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
