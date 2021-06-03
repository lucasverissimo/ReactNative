import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Modal, Image, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
//import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function App() {

  const[type, setType] = useState(RNCamera.Constants.Type.back);
  const[open, setOpen] = useState(false);
  const[capturedPhoto, setCapturedPhoto] = useState(null);

  async function takePicture(camera){
    
    const options = {
      /*quality: 0.5,
      base64: true,
      orientation: 'portrait', 
      fixOrientation: true,
      exif: true*/
      quality: 1,
      base64: true,
      orientation: RNCamera.Constants.Orientation.portrait,
      fixOrientation: true
    };

    
    const data = await camera.takePictureAsync(options); 
    setCapturedPhoto(data.uri);
    setOpen(true);
    console.log(data.uri);
    
    // chama função de salvar a foto.
    savePicture(data.uri);
  }

  function toggleCam(){
    setType(type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
  }

  async function hasAndroidPermission(){
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if(hasPermission){
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(data){
    if(Platform.OS === 'android' && !(await hasAndroidPermission())){
      return;
    }else{

      CameraRoll.save(data, 'photo')
      .then((res) => {
        console.log('Salvo');
        console.log(res);
      })
      .catch((error)=>{
        console.log("ERRO!");
        console.log(error);
      });

    }
  }

  function _openGallery(){
    const options = {
      title:'Selecione uma imagem',
      chooseFromLibraryButtonTitle: 'Buscar imagem',
      noData: true, 
      mediaType: 'photo',
    };    

    launchImageLibrary(options, (response) =>{
    //  launchCamera(options, (response) =>{
      if(response.didCancel){
        console.log("Picker cancelado!");
        return;
      }else
      if(response.error){
        console.log("Erro: "+response.error);
      }else{
        setCapturedPhoto(response.uri);
        setOpen(true);
      }
    });
  }


 return (
  
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <RNCamera
        style={styles.preview}
        type={type}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a camera',
          message: 'Precisamos de permissão para usar a camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar'
        }}
      >

        { ({camera, status, recordAndroidPermissionStatus}) =>{
          if(status !== 'READY') return <View/>

          return (
            <View style={{ marginBottom: 35, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={ () => takePicture(camera)}
                style={styles.capture}
              >
                <Text style={styles.textoBtn}>Capturar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={()=> _openGallery() }
                style={styles.capture}
              >
                <Text style={styles.textoBtn}>Galeria</Text>
              </TouchableOpacity>
            </View>
          );
        }}

      </RNCamera>
      <View style={styles.camPosition}>
        <TouchableOpacity onPress={() => toggleCam() }>
          <Text>Trocar</Text>
        </TouchableOpacity>
      </View>
      
      {
        capturedPhoto && (
          <Modal animationType="slide" transparent={false} visible={open}>
            <View style={styles.viewModal}>
                <TouchableOpacity style={styles.btnCloseModal} onPress={() => setOpen(false)}>
                  <Text>Fechar</Text>
                </TouchableOpacity>
                <Image 
                  style={styles.imageCaptured}
                  source={{uri: capturedPhoto}}
                  resizeMode="contain"                  
                />
            </View>
          </Modal>
        )
      }
      
    </View>
  
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  preview:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture:{
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  textoBtn:{
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  viewModal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  btnCloseModal:{
    margin: 10,
  },
  imageCaptured:{
    width: 350,
    height: 650,
    borderRadius: 15,
    transform: [{rotate: '90deg'}],
  },
  camPosition:{
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    height: 40,
    position: 'absolute',
    right: 25,
    top: 60,
  }

});