import { StyleSheet, Text, TextInput, View, Image} from 'react-native';

import React from 'react';

export default function Find_Trainer() {


  return (
    <View>
        <View>
          {/* Yang atas */}
          <View>  
            <TextInput>
              {/* Search Bar */}
            </TextInput>
            <Image>
              {/* Icon Keranjang Belanja */}
            </Image>
          </View>
        </View>
        

    </View>
  )
}

const style = StyleSheet.create({
  container : {
    flex : 1,
    maxWidth : "50%",
    padding : 5,
    paddingTop : 5
  }
})