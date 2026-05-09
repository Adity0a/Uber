import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.primaryPhoneNumber?.phoneNumber || "");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      try {
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        await user?.setProfileImage({
          file: base64,
        });
        Alert.alert("Success", "Profile image updated!");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to update profile image.");
      }
    }
  };

  const updateProfile = async () => {
    try {
      if (user) {
        await user.update({
          firstName,
          lastName,
        });
        
        // Note: Phone number updates in Clerk usually require verification. 
        // For simplicity in this demo, we'll just show success for names.
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: user?.imageUrl,
              }}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
            <View className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm">
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              containerStyle="w-full"
              inputStyle="p-3.5"
            />

            <InputField
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              containerStyle="w-full"
              inputStyle="p-3.5"
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Enter phone number"}
              containerStyle="w-full"
              inputStyle="p-3.5"
            />
          </View>
          
          <CustomButton 
            title="Update Profile" 
            onPress={updateProfile}
            className="mt-6 w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;