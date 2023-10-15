import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { CLIENT_SECRET, CLIENT_ID } from "@env";
import { IData, IUserInfo, discovery } from "./src/interface/appInterface";
import { getUserToken, getUserInformation } from "./src/services/fetchApi";

WebBrowser.maybeCompleteAuthSession();
const widthScreen = Dimensions.get("window").width;

export default function App() {
  const [codeApi, setCodeApi] = React.useState("test");
  const [userInfo, setUserInfo] = React.useState<IUserInfo>();
  const [isLoading, setIsLoading] = React.useState(false);
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
        <View style={styles.container}>
          <Text style={[styles.text, { marginBottom: 40, fontSize: 30 }]}>
            Welcome {userInfo.name} 😗
          </Text>
          <Image
            source={{
              uri: userInfo.avatar_url,
            }}
            width={300}
            height={300}
          ></Image>
          <Text style={[styles.text, { marginTop: 40, fontSize: 17 }]}>
            {userInfo.bio}
          </Text>
        </View>
      ) : (
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <></>
          )}
          <TouchableOpacity
            disabled={!request}
            style={styles.button}
            onPress={() => {
              promptAsync();
              setIsLoading(true);
            }}
          >
            <Text style={styles.text}>Sign in with</Text>
            <AntDesign name="github" size={29} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: widthScreen * 0.7,
    backgroundColor: "#1EBB44",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
