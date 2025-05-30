import {
  Pressable,
  View,
  ScrollView,
  Alert,
  Button,
  Text,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@rneui/themed";
import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { labels } from "@/constants/Labels";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import asyncKeys from "@/constants/asyncKeys";
import alertMsg from "@/constants/alertMsg";
import Loader from "@/components/ui/Loader";
import { NativeModules } from "react-native";
import CustomSwitch from "@/components/ui/CustomSwitch";
import Toggle from "react-native-toggle-element";
import * as SecureStore from "expo-secure-store";
import { ThemedView } from "@/components/ThemedView";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  FindUserByIdDocument,
  GetAllDynamicPageDocument,
  UpdateProfileDocument,
} from "@/graphql/generated";
import Modal from "react-native-modal";
import CustomValidation from "@/components/CustomValidation";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { Env } from "@/constants/ApiEndpoints";
import * as FileSystem from "expo-file-system";

const { NetworkManager } = NativeModules;

const SettingScreen = () => {
  const { theme, setTheme } = useTheme();
  const [userId, setUserId] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [toggleValue, setToggleValue] = useState<any>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [pages, setPages] = useState<any>([]);
  const { control, setValue, handleSubmit, watch } = useForm<{
    name: string;
    email: string;
    phoneNo: string;
  }>({
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
  });

  const [userData, { data, error, loading, refetch }] =
    useLazyQuery<any>(FindUserByIdDocument);
  const [
    pagesData,
    {
      error: pageDataError,
      data: pagesApiData,
      loading: pageDataLoading,
      refetch: pageDataRefetch,
    },
  ] = useLazyQuery(GetAllDynamicPageDocument);
  // const [updateUser, updateUserState] = useMutation(UpdateProfileDocument, {
  //   onCompleted: () => {
  //     refetch();
  //     setModalVisible(false);
  //     Alert.alert("success", "User updated successfully!");
  //   },
  //   onError: () => {
  //     console.log("0009", JSON.stringify(updateUserState))
  //     // Alert.alert("Error", updateUserState);
  //   }
  // })

  const [updateUser, updateUserState] = useMutation(UpdateProfileDocument, {
    onCompleted: (data) => {
      refetch();
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  useEffect(() => {
    setToggleValue(theme === "light" ? true : false);
  }, [theme]);

  // useEffect(() => {
  //   getUserData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     getUserData()
  //   }
  // }, [isFocused]);

  const getUserData = async () => {
    const res = await pagesData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    setPages(res?.data?.getAllDynamicPage?.data);
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    setUserId(Number(parsedUserData?.userId));
    const response = await userData({
      variables: {
        findUserByIdId: Number(parsedUserData?.userId),
      },
    });
    setImage(response.data?.findUserById?.avatar);
  };

  const rightIcon = () => {
    return (
      <CustomSwitch
        thumbColor={Colors.white}
        onValueChange={() => {}}
        value={false}
        style={styles.switchStyle}
      />
    );
  };

  const rightIcon2 = () => {
    return (
      <View
        style={{
          position: "absolute",
          right: s(10),
        }}
      >
        <Toggle
          value={toggleValue}
          onPress={(newState) => {
            setToggleValue(newState);
            setTheme(theme === "light" ? "dark" : "light");
          }}
          thumbButton={{
            width: ms(28),
            height: ms(28),
            radius: 30,
            // activeBackgroundColor: Colors.transparent,
            // inActiveBackgroundColor: Colors.transparent,
          }}
          leftComponent={
            <MaterialCommunityIcons
              name="weather-night"
              size={ms(18)}
              color={Colors.white}
            />
          }
          rightComponent={
            <Feather name="sun" size={ms(18)} color={Colors.orange} />
          }
          trackBar={{
            activeBackgroundColor: Colors[theme].text,
            inActiveBackgroundColor: Colors[theme].shadow,
            borderWidth: 1,
            borderActiveColor: Colors.black,
            borderInActiveColor: Colors.white,
            width: s(45),
            height: vs(22),
          }}
        />
      </View>
    );
  };

  const firstData = [
    {
      id: 1,
      title: labels.profile,
      iconLib: AntDesign,
      iconName: "profile",
      onTouchAction: () => {
        setValue("name", data?.findUserById?.name);
        setValue("email", data?.findUserById?.email);
        setValue(
          "phoneNo",
          (data?.findUserById?.mobileNo as number).toString()
        );
        setModalVisible(true);
      },
    },
    {
      id: 2,
      title: labels.notification,
      iconLib: Ionicons,
      iconName: "notifications-outline",
      onTouchAction: () => {},
    },
    {
      id: 3,
      title: labels.language,
      iconLib: FontAwesome,
      iconName: "language",
      onTouchAction: () => {},
    },
    // {
    //   id: 4,
    //   title: labels.appearance,
    //   iconLib: Ionicons,
    //   iconName: "moon",
    //   onTouchAction: () => {},
    //   rightIcon: rightIcon2(),
    // },
    {
      id: 5,
      title: labels.support,
      iconLib: FontAwesome,
      iconName: "support",
      onTouchAction: () => {},
    },
    {
      id: 6,
      title: labels.help,
      iconLib: Feather,
      iconName: "help-circle",
      onTouchAction: () => {},
    },
  ];

  const logoutFunc = () => {
    Alert.alert(labels.logout_title, labels.logout_msg, [
      {
        text: labels.cancel,
        onPress: () => {},
        style: "cancel",
      },
      {
        text: labels.logout,
        onPress: async () => {
          await SecureStore.deleteItemAsync("userData");
          router.dismissTo("/login");
        },
      },
    ]);
  };

  const onSubmit = () => {
    const params = {
      name: watch("name"),
      mobileNo: Number(watch("phoneNo")),
      id: userId,
      email: watch("email"),
      avatar: image,
    };

    try {
      updateUser({
        variables: {
          data: params,
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // const handleImagePickerPress = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri)
  //   }
  // };

  const uploadImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        console.error("File does not exist:", uri);
        return;
      }

      const fileExtension = uri.split(".").pop() || "jpg"; // Default to jpg if no extension
      const mimeType = `image/${fileExtension}`;

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `upload.${fileExtension}`,
        type: mimeType,
      } as unknown as Blob);

      // formData.append("file", {
      //   uri: uri,
      //   name: `upload.${fileExtension}`,
      //   type: mimeType,
      // } as any);

      const uploadResponse = await fetch(`${Env.SERVER_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!uploadResponse.ok) {
        const err = await uploadResponse.text();
        throw new Error(`Upload failed: ${err}`);
      }
      const responseData = await uploadResponse.json();
      // console.log("Upload successful:", responseData?.files[0]);
      setImage(responseData?.files[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  };

  return (
    <CustomHeader
      toggleValue={toggleValue}
      title={labels.settings}
      rightComponent={
        <Pressable style={styles.iconStyle} onPress={logoutFunc}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={Colors[theme].text}
          />
        </Pressable>
      }
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: ms(10),
          paddingBottom: vs(15),
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView>
          <View style={styles.userInfo}>
            <Pressable style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${Env?.SERVER_URL}${image}`,
                }}
                style={styles.image}
              />
            </Pressable>
            <View>
              <ThemedText style={styles.userName}>
                {data?.findUserById?.name}
              </ThemedText>
              <ThemedText style={styles.userEmail}>
                {data?.findUserById?.email}
              </ThemedText>
            </View>
          </View>
          {firstData?.map((item: any, i: number) => {
            return (
              <Pressable
                key={i}
                onPress={item?.onTouchAction}
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      theme === "light"
                        ? Colors?.cartBackground
                        : Colors[theme]?.cart,
                  },
                ]}
              >
                {item.image ? (
                  item.image
                ) : item.iconLib ? (
                  <item.iconLib
                    name={item.iconName}
                    size={ms(22)}
                    color={Colors[theme].text}
                  />
                ) : null}

                <View style={{ width: "80%" }}>
                  <ThemedText type="default">{item.title}</ThemedText>
                  {item.subtitle && (
                    <ThemedText
                      type="default"
                      style={{
                        fontSize: ms(12),
                        lineHeight: ms(17),
                      }}
                    >
                      {item.subtitle}
                    </ThemedText>
                  )}
                </View>

                {item.rightIcon && item.rightIcon}
              </Pressable>
            );
          })}

          {pages?.map((item: any, i: number) => {
            return (
              <Pressable
                key={i}
                onPress={() =>
                  router.push({
                    pathname: "/dynamicPage",
                    params: {
                      data: JSON.stringify(item),
                    },
                  })
                }
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      theme === "light"
                        ? Colors?.cartBackground
                        : Colors[theme]?.cart,
                  },
                ]}
              >
                {item.image ? (
                  item.image
                ) : item.iconLib ? (
                  <item.iconLib
                    name={item.iconName}
                    size={ms(22)}
                    color={Colors[theme].text}
                  />
                ) : (
                  <Foundation
                    name="page-csv"
                    size={ms(22)}
                    color={Colors[theme].text}
                  />
                )}

                <View style={{ width: "80%" }}>
                  <ThemedText type="default">
                    {item.slug.charAt(0).toUpperCase() + item.slug.slice(1)}
                  </ThemedText>

                  {item.subtitle && (
                    <ThemedText
                      type="default"
                      style={{
                        fontSize: ms(12),
                        lineHeight: ms(17),
                      }}
                    >
                      {item.subtitle}
                    </ThemedText>
                  )}
                </View>

                {item.rightIcon && item.rightIcon}
              </Pressable>
            );
          })}
        </ThemedView>

        {/* user info modal */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              backgroundColor: Colors[theme].cart,
              height: vs(530),
              width: s(300),
              borderRadius: 10,
              alignSelf: "center",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <ThemedText type="subtitle">Update Profile</ThemedText>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
              </Pressable>
            </View>

            <View style={{ padding: 10 }}>
              <Pressable style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `${Env?.SERVER_URL}${image}`,
                  }}
                  style={styles.image}
                />
              </Pressable>
              <Pressable
                onPress={handleImagePickerPress}
                style={styles?.editImage}
              >
                <Feather
                  name="edit-2"
                  size={ms(20)}
                  color="black"
                  style={{ fontWeight: "bold" }}
                />
              </Pressable>

              {/* <Pressable onPress={handleImagePickerPress} style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </Pressable> */}
              <CustomValidation
                type="input"
                control={control}
                labelStyle={styles.label}
                name={"name"}
                label={"Name"}
                rules={{
                  required: "Name is required",
                }}
                autoCapitalize="none"
              />

              <CustomValidation
                type="input"
                control={control}
                name={"email"}
                label={"Email"}
                editable={false}
                labelStyle={styles.label}
                rules={{
                  required: "Email is required",
                }}
              />
              <CustomValidation
                type="input"
                control={control}
                name={"phoneNo"}
                label={"Phone No"}
                labelStyle={styles.label}
                rules={{
                  required: "Phone no is required",
                }}
              />
            </View>

            <CustomButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              style={{
                marginTop: vs(10),
                backgroundColor: Colors[theme].background,
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </CustomHeader>
  );
};

export default SettingScreen;

const styles = ScaledSheet.create({
  headerLeft: {
    // fontSize: "18@ms",
    fontWeight: 600,
    textAlign: "center",
  },
  iconStyle: {
    padding: "10@ms",
    borderRadius: "100%",
  },
  container: {
    minHeight: "45@vs",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "5@ms",
    padding: "10@ms",
    borderRadius: "12@ms",
    gap: "10@ms",
  },
  switchStyle: {
    position: "absolute",
    right: "10@s",
  },
  userInfo: {
    // marginVertical: vs(15),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(15),
    width: "100%",
  },
  userName: {},
  userEmail: {
    color: "gray",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
  imageContainer: {
    width: "80@ms",
    height: "80@ms",
    borderRadius: "70@ms",
    marginBottom: "12@ms",
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: ms(50),
    resizeMode: "cover",
  },
  editImage: {
    position: "absolute",
    top: 3,
    left: 55,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
