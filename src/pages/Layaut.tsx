import React,{ReactNode} from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
interface LayautProps {
    children: ReactNode;
  }

export const Layaut : React.FC<LayautProps> = ({children}) => {

      
  return (
    <ImageBackground
    source={require("../../assets/wave.png")}
    style={styles.loginScreenContainer}
    imageStyle={styles.bgStyle}
  >
    {children}
   </ImageBackground>
  )
}

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        alignItems: "center",
     
      },
    bgStyle: {
        flex: 1,
        width: "100%",
        height: "50%",
        resizeMode: "cover", // Asegura que la imagen cubra todo el contenedor
        alignSelf: "flex-start",
      },
})
