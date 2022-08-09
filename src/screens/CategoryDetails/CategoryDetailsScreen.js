import { View, Text, ImageBackground, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React,{ useState, useEffect } from 'react'
import AppBar from '../../components/AppBar'
import { useSelector, useDispatch } from 'react-redux';
import { imageURL, primaryColor, secondaryColor } from '../../constants/constants';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchItem from '../../components/SearchItem';
import instance from '../../helper/axios';
import { setCategoryProducts, setSelectedCategory, setSelectedCategoryProducts } from '../../store/actions/categories';


export default function CategoryDetailsScreen(props) {


 const [loading, setLoading] = useState(true);
 const categories = useSelector(state => state.categories.categories);
 const dispatch = useDispatch();
 const category = useSelector(state => state.categories.category);
 const [products, setProducts] = useState([]);



 useEffect(( ) => {
     getSelectedCategory();   
 }, []);


 const getSelectedCategory = async() => {
    if(category!= null){
        if(category.id == props.route.params.category.id){
            if(category.products.length<=0){
                getCategoryProducts();
            }else{
                setLoading(false);
                setProducts(category.products);
            }
        }else{
            let cat = categories.find(elem => elem.id == props.route.params.category.id);   
            dispatch(setSelectedCategory(cat));
            getCategoryProducts();
        }
    }else{
        let cat = categories.find(elem => elem.id == props.route.params.category.id);   
        dispatch(setSelectedCategory(cat));
        getCategoryProducts();
    }
 }



 const getCategoryProducts = () => {
        instance.post('/get-category-products', {
            id: props.route.params.category.id
        }).then(response => {
            setLoading(false);
            if(response.data.status=='success'){
                setProducts(response.data.products);
                dispatch(setSelectedCategoryProducts(response.data.products));
                // dispatch(setCategoryProducts({categoryid: props.route.params.category.id, products: response.data.products}))
            }else{
               
                alert('Unable to get products. Please try again later');
            } 
        }).catch(error => {
            setLoading(false);
            alert('Unable to get products. Please try again later 1'+error.message);
        })
 }


 const renderItem = ({ item }) => (
    <SearchItem item={item}/>
 );


 const renderCategoryProducts = () => {
    if(loading){
        return (
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                <ActivityIndicator size={'small'} color={secondaryColor} />
                <Text style={{color: primaryColor}}>Loading...</Text>
            </View>
        )
    }else{
        if(products.length <= 0){
            return(
                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <View style={{height: 40, width: 40, borderRadius: 20, backgroundColor: secondaryColor, alignItems:'center', justifyContent:'center', marginBottom: 10}}>
                       <Ionicons name="menu" size={30} color={'#FFF'} />
                    </View>
                    <Text style={{color: primaryColor,}}>No products found.</Text>
                    <Text style={{color: primaryColor,}}>Please check again later</Text>
                </View>
            )
        }else{
            return (
                <View>
                    <SafeAreaView>
                        <FlatList
                            data={products}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
              )
        }     
    }
 }

  return (
    <>
    <AppBar title={"Details"} isHome={false} hasBack={true} navigation={props.navigation}/>
      <View style={styles.container}>
            <ImageBackground imageStyle={{ borderRadius: 5, opacity:0.2,}} source={{uri: imageURL+'/categories/'+props.route.params.category.image}} style={styles.imgBg}>
                <Text style={styles.heading}>{props.route.params.category.name} COLLECTIONS</Text>
            </ImageBackground>

           
            {renderCategoryProducts()}
          
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingBottom: 50
    },
    imgBg: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        height: 50,
        width: '100%',
        // position: 'absolute',

    },
    heading:{
        color:'#FFF',
        fontWeight: 'bold',
        textTransform:'uppercase'
    }
})