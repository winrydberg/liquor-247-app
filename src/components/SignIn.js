import { View, Text, Pressable, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { Center, Box, Heading, VStack, FormControl, Button, Input, HStack, Link } from 'native-base'
import Loader from "react-native-modal-loader";
import { primaryColor, secondaryColor } from '../constants/constants';
import instance from '../helper/axios';
import { setReduxUser, setUserToken } from '../store/actions/user';
import { storeUser,storeToken } from '../helper/storage';


export default function SignIn(props) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    code: '',
    message: ''
  });





  const signInUser = () => {
    if(username==null || username.length<=0){
      setError({
        code: 'USERNAME',
        message: 'This field is required'
      })
      return;
    }else if(password==null){
      setError({
        code: 'USERNAME',
        message: 'Password field is required'
      })
      return;
    }else{
      setLoading(true);
      instance.post('/sanctum/token', {
        username: '233'+username.substring(username.length-9),
        password: password,
        device_name: '233'+username.substring(username.length-9),
      }).then(async (response) => {
        setLoading(false);
        if (response.data.status == 'success') {

          dispatch(setReduxUser(response.data.user));
          dispatch(setUserToken(response.data.token));
          await storeUser(response.data.user);
          await storeToken(response.data.token);
          
        } else {
          alert(response.data.message);
        }
      }).catch(error => {
        setLoading(false);
        alert(error.message)
      })
    }
    
  }


  return <Center w="100%">
    <Loader loading={isLoading} color={secondaryColor} />
      <Box safeArea p="2" py="8" w="100%" >
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: primaryColor
      }}>
          Welcome
        </Heading>
        <Heading mt="1" style={{color:'gray'}} fontWeight="300" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Phone No</FormControl.Label>
            <Input keyboardType="phone-pad" onChangeText={(value) => setUsername(value)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(value) => setPassword(value)}/>
            <Pressable style={{marginTop: 10, marginBottom: 10}}>
                      <Text style={{color: secondaryColor}}>Forgot Password?</Text>
            </Pressable>
          </FormControl>
           <Pressable onPress={() => signInUser()} style={styles.signInButton} android_ripple={{ color: primaryColor,borderless: false, radius: 10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>SIGN IN</Text>
          </Pressable>
          <HStack mt="6" justifyContent="center" style={{flexDirection:'row', alignItems:'center', }}>
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Pressable style={{padding: 10}} onPress={() => {
                props.navigation.navigate('Register')
            }}>
                      <Text style={{color: secondaryColor}}>Sign Up</Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>;
}


const styles = StyleSheet.create({
  signInButton: {
    justifyContent: 'center',
    alignItems:'center',
    height: 45,
    backgroundColor: secondaryColor,
    width: '100%'
  }
})