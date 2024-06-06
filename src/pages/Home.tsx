import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Layaut } from "./Layaut";

export const Home = () => {
  return (
    <Layaut>
      <View
        style={{
          marginTop: 70,
          width: "100%",
          paddingHorizontal: 20,
          flexDirection: "column",
        }}
      >
        <BannerHome />
        <SearchRepository />

        <ListUserRepository />
      </View>
    </Layaut>
  );
};

const BannerHome = () => {
  return (
    <View style={styles.containerHome}>
      <View>
        <Image
          style={styles.imageProfile}
          source={require("../../assets/profile.jpg")}
        />
      </View>
      <Text style={styles.userTitle}>Eduardo 🚀</Text>
    </View>
  );
};

const SearchRepository = () => {
  return (
    <View style={styles.containerSearchRepository}>
      <TextInput
        style={styles.inputStyles}
        placeholder="Look for eduardo"
      ></TextInput>

      <TouchableOpacity
        onPress={() => {
          console.log("hi :)");
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

//json fake data test
const data = [
  {
    userName: "Eduardo Head",
    description: "Backend - Cloud - Fullstack developer",
    stars: 5,
    imageUri: "https://scontent.fpbc1-2.fna.fbcdn.net/v/t39.30808-6/359695642_1716949612067813_2310946500128074844_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WxFHOtBzI3cQ7kNvgHgVNKD&_nc_ht=scontent.fpbc1-2.fna&oh=00_AYCwsLGT4xTr8siH3csumFW83PzWFqzI8A6HEt3YRzDh_w&oe=66673E62",
  },
  {
    userName: "David",
    description: "Frontend developer - ios ",
    stars: 4,
    imageUri:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userName: "Jessica",
    description: "Senior Angular - TS ",
    stars: 5,
    imageUri:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    userName: "Jorge",
    description: "DevOps - Docker - Kubernetes",
    stars: 5,
    imageUri:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

];
const ListUserRepository = () => {
  return (
    <>
      <Text style={styles.listTitle}>Repository ranking</Text>
   
        {data.map((data, index) => {
          return (
            <View key={index} style={styles.listUserRepository}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                style={styles.listPhotoRepository}
                source={{uri:data.imageUri}}
                resizeMode="cover"
              ></Image>
              <View style={{ flexDirection: "column" }}>
                <Text style={{color:"#342D61", fontSize:15, }}>{data.userName} 🇲🇽 </Text>
                <Text style={{width:150, paddingVertical:10, fontStyle:'italic'}}>{data.description}</Text>
                <View style={{ flexDirection: "row" }}>
                  {Array.from({ length: data.stars }).map((_, index) => (
                    <AntDesign
                      key={index}
                      name="star"
                      size={22}
                      color="#EBD30B"
                    />
                  ))}
                </View>
              </View>
            </View>
            </View>
          );
        })}
      
    </>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imageProfile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 2,
  },
  userTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  containerSearchRepository: {
    flexDirection: "row",
    gap: 20,
    marginTop: 40,
    marginBottom: 30,
  },
  inputStyles: {
    width: "80%",
    borderWidth: 1.2,
    borderColor: "#000",
    padding: 10,
    borderRadius: 40,
    backgroundColor: "#fff",
  },
  listUserRepository: {
    flexDirection: "column",
    width: "100%",
    height: "16%",
    backgroundColor: "#E5E4E4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  listTitle: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "600",
    color: "#342D61",
  },
  listPhotoRepository: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
