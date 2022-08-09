import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import Loader from 'react-native-modal-loader'

export default function SummaryScreen() {

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader loading={loading} color={secondaryColor} />
      <View style={{flex: 1, backgroundColor:'#FFF'}}>
            
      </View>
    </>
  )
}