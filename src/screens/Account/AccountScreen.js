import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Box, VStack,HStack,Spacer, Divider } from 'native-base';
import AppBar from '../../components/AppBar';
import { primaryColor, secondaryColor } from '../../constants/constants';
import SignIn from '../../components/SignIn';
import { setReduxUser, setUserToken } from '../../store/actions/user';
import { storeToken, storeUser } from '../../helper/storage';

export default function AccountScreen(props){

        const orders = useSelector(state=>state.orders.orders);
        const user = useSelector(state=>state.user.user);
        const dispatch = useDispatch();


        logout = async() => {
            Alert.alert(
                "Logout Confirmation",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "YES, LOGOUT", onPress: async() => {
                        dispatch(setReduxUser(null));
                        dispatch(setUserToken(null));
                        await storeUser(null);
                        await storeToken(null)
                  } }
                ]
              );
            
        }
       

    
        const renderPage = () => {
            if (user == null) {
                return <SignIn navigation={props.navigation}/>
            } else {
                return (
                    <View>
                        <View style={styles.photoContainer}>
                            <Image source={require('../../assets/images/user.png')} style={styles.profilePhoto}/>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Divider/>
                            <View style={styles.propertyContainer}>
                                <Text style={styles.label}>NAME</Text>
                                <Text style={styles.contentStyle}>{user.name}</Text>
                                
                            </View>
                            <Divider/>
                           
                            <View style={styles.propertyContainer}>
                                <Text style={styles.label}>PHONE NO</Text>
                                <Text style={styles.contentStyle}>{user.phoneno}</Text>
                                
                            </View>
                            <Divider/>

                            <View style={styles.propertyContainer}>
                                <Text style={styles.label}>EMAIL ADDRESS</Text>
                                <Text style={styles.contentStyle}>{user.email}</Text>
                                
                            </View>
                            <Divider/>
                            

                            <View style={{flex: 1, alignItems:'center', marginTop: 30}}>
                                <Pressable onPress={logout} style={styles.logoutbtn}>
                                    <Text style={styles.btnLabel}>LOGOUT</Text>
                                </Pressable>
                            </View>
                            

                        </View>
                    </View>
                )
            }
        }


        return (
            <>
                <View style={styles.container}>
                <AppBar title="Account" isHome={false} navigation={props.navigation}/>
                {renderPage()} 
                </View>                  
            </>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
        // alignItems:'center',
        // justifyContent:'center'
    },
    photoContainer: {
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20
    },
    profilePhoto: {
        borderColor: secondaryColor,
        borderWidth: 3,
        height: 100,
        width: 100,
        borderRadius: 50
    },
    propertyContainer: {
        padding: 10,
        justifyContent:'center',
        // alignItems:'center'
    },
    label: {
        fontWeight:'bold',
        fontSize: 15,
       
    },
    contentStyle: {
        // fontWeight: '300', 
        // fontSize: 16,
        color: primaryColor
    },
    logoutbtn: {
        height: 40,
        width: '70%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: secondaryColor,
        borderRadius: 20,
    },
    btnLabel: {
        fontWeight: 'bold',
        color:'#FFF'
    }
})
 
// export default OrdersScreen;