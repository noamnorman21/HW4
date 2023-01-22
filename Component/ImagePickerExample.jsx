import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      props.setImageUp(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnCover}>
        <Button color={'white'} onPress={pickImage} title='Upload an image' />
      </View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCover: {
    marginBottom: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});