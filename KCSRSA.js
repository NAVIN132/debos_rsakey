import React, { Component } from 'react'
import { View, Text } from 'react-native'

import {RSA} from 'react-native-rsa-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import * as Keychain from 'react-native-keychain';

let secret = 'Hello How Are You.';

const generateDemo = async () => {
  // Generate the Key First Time 
  const keys = await RSA.generate()
  // Store the Private Key
  RNSecureKeyStore.set('N132PVT', keys.private, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
    .then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
        console.log('Error occoured');
    });
// Store the Public Key
    RNSecureKeyStore.set('N132PUB', keys.public, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
    .then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
        console.log('Error occoured');
    });

    console.log('Key Stored');
}


const signDemo = async () => {

  // Fetch the Stored Private Key 
  sPrivateKey='';
  sPublicKey='';

  RNSecureKeyStore.get("N132PVT")
  .then((res) => {
      sPrivateKey=res;
  }, (err) => {
      console.log(err);
  });

  // Fetch the Stored Public Key
  RNSecureKeyStore.get("N132PUB")
  .then((res) => {
    sPublicKey=res;
  }, (err) => {
      console.log(err);
  });
  const keys = await RSA.generate()
  const signature = await RSA.sign(secret, sPrivateKey)
  console.log('signature', signature);
  const valid = await RSA.verify(signature, secret, sPublicKey)
  console.log('verified', valid);
}


const setGenPass = async () => {
  const username = 'Navin132';
  const password = 'test1234';

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retreive the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Credentials successfully loaded for user ' + credentials.username);
    } else {
      console.log('No credentials stored')
    }
  } catch (error) {
    console.log('Keychain couldn\'t be accessed!', error);
  }
  await Keychain.resetGenericPassword()
}


const runDemos = async () => {
 // await generateDemo()  // This Function will be used for geenerate the key and Store the key
 //await signDemo()    // This Function Will Be used for Sign the Data
 await setGenPass()
}

runDemos().then()

class App extends Component {
  componentWillMount () {
  
  }

  componentWillUnmount () {
    
  }
   
 
  render () {
    return (
      <View>
        <Text>
            Demo
        </Text>
      </View>
    )
  }
}

export default App
