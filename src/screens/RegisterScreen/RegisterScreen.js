import { View, Text, Pressable, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { Center, Box, Heading, VStack, FormControl, Button, Input, HStack, Link } from 'native-base'
import Loader from "react-native-modal-loader";
import { primaryColor, secondaryColor } from '../../constants/constants';
import { storeToken, storeUser } from '../../helper/storage';
import { setReduxUser, setUserToken } from '../../store/actions/user';
import instance from '../../helper/axios';
import AppBar from '../../components/AppBar';


export default function RegisterScreen(props) {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneno, setPhoneNo] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    code: '',
    message: ''
  });

  const dispatch = useDispatch();



  const signInUser = () => {
    setLoading(true);
    instance.post('/register', {
      name: username,
      password: password,
      phoneno: phoneno,
      email: email,
      device_name: phoneno
    }).then(response => {
      setLoading(false);
      
      if (response.data.status == 'success') {
        alert('Registration successful');
        dispatch(setReduxUser(response.data.user));
        dispatch(setUserToken(response.data.token));
        storeUser(response.data.user);
        storeToken(response.data.token);
        props.navigation.goBack();

      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      setLoading(false);
      alert(error.message)
    })
  }


  return(<>
  <AppBar title="Register" isHome={false} navigation={props.navigation} hasBack={true}/>
  <Center w="100%">
    <Loader loading={isLoading} color={secondaryColor} />
      <Box safeArea p="2" py="8" w="100%" >
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: primaryColor
      }}>
          Welcome
        </Heading>
        <Heading mt="1" style={{color:'gray'}} fontWeight="300" size="xs">
          Sign up to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Name</FormControl.Label>
            <Input onChangeText={(value) => setUsername(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Phone No</FormControl.Label>
            <Input onChangeText={(value) => setPhoneNo(value)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={(value) => setPhoneNo(value)}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(value) => setPassword(value)}/>
            <Pressable style={{marginTop: 10, marginBottom: 10}}>
                      <Text style={{color: secondaryColor}}>Forgot Password?</Text>
            </Pressable>
          </FormControl>
           <Pressable onPress={() => signInUser()} style={styles.signInButton} android_ripple={{ color: primaryColor,borderless: false, radius: 10}}>
              <Text style={{color:'white', fontWeight:'bold'}}>REGISTER</Text>
          </Pressable>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              Already have an account?
            </Text>
            <Pressable onPress={() =>{
              props.navigation.gotBack()
            }}>
                      <Text style={{color: secondaryColor}}>Sign In</Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>
    </>);
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