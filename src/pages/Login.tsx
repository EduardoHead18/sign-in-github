import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { CLIENT_SECRET, CLIENT_ID } from "@env";
import { IData, IUserInfo, discovery } from "../interface/appInterface";
import { getUserToken, getUserInformation } from "../services/fetchApi";
import { Home } from "./Home";

WebBrowser.maybeCompleteAuthSession();

const widthScreen = Dimensions.get("window").width;

export default function Login() {
  const [codeApi, setCodeApi] = React.useState("test");
  const [userInfo, setUserInfo] = React.useState<IUserInfo>();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "com.eduardo.sign-in-with-github",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    try {
      if (response?.type === "success") {
        const { code } = response.params;
        setCodeApi(code);
      }
    } catch (error) {
      console.log(error);
    }
    requestToTheApi();
  }, [response, codeApi]);

  //Here the Idata model is created and sent to the API to obtain the token
  const data: IData = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: codeApi,
    redirect_uri: makeRedirectUri({
      scheme: "com.eduardo.sign-in-with-github",
    }),
  };

  const requestToTheApi = async () => {
    await getUserToken(data);
    const userInfoData = await getUserInformation();
    setUserInfo(userInfoData);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="blue"
        barStyle="light-content"
      />
      {userInfo && Object.keys(userInfo).length > 0 ? (
        <Home></Home>
      ) : (
        <ImageBackground
          source={require("../../assets/wave.png")}
          style={styles.loginScreenContainer}
          imageStyle={styles.bgStyle}
        >
          <View style={styles.loginContainerTwo}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.textTitle}>Inicia sesión con GitHub</Text>
              <Text style={styles.subTitle}>
                Search any GitHub repositories from your phone 🚀
              </Text>
            </View>

            <TouchableOpacity
              disabled={!request}
              style={styles.button}
              onPress={() => {
                promptAsync();
              }}
            >
              <Text style={styles.text}>Sign in </Text>
              <AntDesign name="github" size={29} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  loginScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainerTwo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: widthScreen * 0.7,
    backgroundColor: "#342D61",
    padding: 20,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: "50%",
    marginBottom: "30%",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    textAlign: "center",
    color: "#342D61",
    fontSize: 22,
    marginTop: "10%",
  },
  bgStyle: {
    flex: 1,
    width: "100%",
    height: "50%",
    resizeMode: "cover", // Asegura que la imagen cubra todo el contenedor
    alignSelf: "flex-start",
  },
});
