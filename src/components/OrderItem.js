import { View, Text, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import { primaryColor, secondaryColor } from '../constants/constants'
import { Divider } from 'native-base'

export default function OrderItem(props) {


    const renderStatus = () => {
        if(props.item.status=='pending'){
            return (
                <View style={{marginLeft: 1, paddingTop: 1,paddingBottom: 1, paddingRight: 10,paddingLeft: 1, borderRadius: 10,alignItems:'center', justifyContent: 'center',}}>
                    <Text style={[styles.label, {color:secondaryColor, fontWeight:'bold', textTransform:'capitalize'}]}> {props.item.status}</Text>
                </View>
            )
        }else if(props.item.status=='delivered'){
            return (
                <View style={{marginLeft: 1, paddingTop: 1,paddingBottom: 1, paddingRight: 10,paddingLeft: 1, borderRadius: 10,alignItems:'center', justifyContent: 'center',}}>
                    <Text style={[styles.label, {color:'green', fontWeight:'bold', textTransform:'capitalize'}]}> {props.item.status}</Text>
                </View>
            )
        }else if(props.item.status=='cancelled'){
            return (
                <View style={{marginLeft: 1, paddingTop: 1,paddingBottom: 1, paddingRight: 10,paddingLeft: 1, borderRadius: 10,alignItems:'center', justifyContent: 'center',}}>
                    <Text style={[styles.label, {color:'brown', fontWeight:'bold', textTransform:'capitalize'}]}> {props.item.status}</Text>
                </View>
            )
        }else if(props.item.status=='approved'){
            return (
                <View style={{marginLeft: 1, paddingTop: 1,paddingBottom: 1, paddingRight: 10,paddingLeft: 1, borderRadius: 10,alignItems:'center', justifyContent: 'center',}}>
                    <Text style={[styles.label, {color:'#4D7FE3', fontWeight:'bold', textTransform:'capitalize'}]}> {props.item.status}</Text>
                </View>
            )
        }
    }
  
  return (
    <View style={styles.container}>
      <View style={styles.labelcon}>
            <Text style={{color: primaryColor}}>Order No:</Text>
            <Text style={styles.label}> {props.item.orderno}</Text>
      </View>

      <View style={styles.labelcon}>
            <Text style={{color: primaryColor}}>Order Amt:</Text>
            <Text style={styles.label}> GH₵ {props.item.amount}</Text>
      </View>

      <View style={styles.labelcon}>
            <Text style={{color: primaryColor}}>Delivery Charge:</Text>
            <Text style={styles.label}> GH₵ {props.item.delivery_charge}</Text>
      </View>
      <Divider style={{marginTop: 5, marginBottom: 5}}/>

      <View style={styles.labelcon}>
            <Text style={{color: primaryColor}}>Date:</Text>
            <Text style={styles.label}> {props.item.created_at}</Text>
      </View>
      <View style={styles.labelcon}>
            <Text style={{color: primaryColor}}>Status:</Text>
            {renderStatus()}
      </View>
      <View style={styles.buttonContainer}>
          <View style={styles.btnCheckStatus}>
            <Text style={{color: secondaryColor, fontWeight:'400'}}>Order Details</Text>
          </View>

          {/* <View style={styles.btnDetails}>
            <Text style={{color:'white', fontWeight:'400'}}>Order Details</Text>
          </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: Dimensions.get('window').height/3.8,
        borderRadius: 5,
        padding: 10,
        borderRadius: 5,
        borderColor: "#f5f5f5",
        borderWidth: 1,
        // borderWidth:2,
        // borderColor: primaryColor,
      
        // shadowColor: '#7f5DF0',
        // shadowOffset: {
        //   width: 0,
        //   height: 4,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 2,
        // elevation: 1,
    },
    labelcon: {
        flexDirection:'row',
        padding: 2,
    },
    label: {
       
        fontWeight:'300',
        color: primaryColor
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    btnDetails: {
        height: 30,
        borderRadius: 15,
        backgroundColor: secondaryColor,
        width: '40%',
        alignItems:'center',
        justifyContent:'center'
    },
    btnCheckStatus: {
        // position: 'absolute',
        // bottom: -45,
        backgroundColor:'#FFF',
        height: 30,
        borderRadius: 15,
        borderColor: secondaryColor,
        borderWidth:2,
        width: '40%',
        alignItems:'center',
        justifyContent:'center'
    }
        
})

