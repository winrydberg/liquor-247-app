import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { imageURL, primaryColor, randomColors, secondaryColor } from '../constants/constants';

export default function CategoryItem(props) { 


  const goToCategoryPage = () => {
      props.navigation.navigate('Category',{category: props.item});
  }


  return (
    <Pressable onPress={() => goToCategoryPage()} style={{ borderRadius: 5, }}>
        <ImageBackground imageStyle={{ borderRadius: 5, opacity:0.5,}} resizeMode={"cover"} source={{uri: imageURL+'/categories/'+props.item.image}} style={styles.categoryImage}>
             <View style={styles.overlay}></View>
            <Text style={styles.label}>{props.item.name}</Text>
        </ImageBackground>
        
     </Pressable>
  )
}

const styles = StyleSheet.create({
    categoryImage: {
        width: 100,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
        
    },

    overlay: {
        backgroundColor:'rgba(255,0,0,0.5)',
        opacity: 0.2
    },
    
    label: {
        color:'#FFF',
        fontWeight:'500',
    
    }
})