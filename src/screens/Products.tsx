import {View, Text, FlatList, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useProducts} from '../context/ProductContext';

const Products = ({navigation}: any) => {
  const {products, isLoading, addProduct, myProducts} = useProducts();
  const [myProductsLength, setMyProductsLength] = useState(myProducts.length);

  console.log({products, isLoading, myProducts});

  useEffect(() => {
    console.log('myProducts', myProducts);
    navigation.setOptions({
      title: 'Product List',
      headerRight: () => (
        <View style={{marginLeft: 0}}>
          <Text>Product count:{myProducts.length}</Text>
        </View>
      ),
    });
  }, [myProductsLength]);

  useEffect(() => {
    console.log('myProducts updated:', myProducts);
    setMyProductsLength(myProducts.length);
  }, [myProducts]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      renderItem={({item}: any) => {
        return (
          <View>
            <Text>Product</Text>
            <Button
              title="Add to cart"
              onPress={() => {
                addProduct(item);
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default Products;
