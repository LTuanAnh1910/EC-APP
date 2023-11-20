import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };
    axios
      .post("http://localhost:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Address added successfully");
        setName("");
        setHouseNo("");
        setMobileNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error");
        console.log("err", error);
      });
  };
  console.log(userId);
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00ced1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new address
        </Text>

        <TextInput
          placeholder="Viet Nam"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="enter your name"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholder="enter your phone number"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat, House NO, Building, Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholder=""
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Street, Sector, Village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholder=""
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholder="Eg near appollo hospital"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholder="enter Pincode"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#ffc72c",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
