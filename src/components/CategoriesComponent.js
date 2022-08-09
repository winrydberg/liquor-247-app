import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import CategoryItem from './CategoryItem';


export default function CategoriesComponent(props) {

    const categories = useSelector(state =>state.categories.categories);
    const renderItem = ({ item }) => (
        <CategoryItem item={item}  navigation={props.navigation}/>
    );


    return (
        <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 5}}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}