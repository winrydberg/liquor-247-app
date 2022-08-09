import { View, Text } from 'react-native';
import React from 'react';
import AppBar from '../../components/AppBar';


export default function AboutScreen(props) {
  return (
    <>
    <AppBar title="About App" isHome={false} navigation={props.navigation} hasBack={true}/>
      <View style={{flex:1, alignItems:'center', justifyContent:'center' }}>
            
                   <Text style={{fontSize: 25, }}>Liqour 24/7</Text>
                   <Text>Version 1.0.0</Text>
           
      </View>
    </>
  )
}