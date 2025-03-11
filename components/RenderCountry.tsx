import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Collapsible } from "./Collapsible";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ThemedView } from "./ThemedView";
import { useUpdateListMutation } from "@/redux/apiHook";
import alertMsg from "@/constants/alertMsg";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText"; 

const RenderCountry = ({ item,updateListApi }: any) => {
  const { theme } = useTheme();
  const { user } = useSelector(selectUser);

 
  return (
    <Collapsible
      title={item?.countryName}
      subtitle={item?.cityName}
      liked={item?.is_favourite}
      url={item?.flag}
      style={[styles.countryView, { backgroundColor: Colors[theme].cartBg }]}
      isArrow={item.subServer.length > 0}
      onLike={() => {
        updateListApi({
          country_id: item?._id,
          user_id: user?.user_id, 
        });
      }}
    >
      {item?.subServer.length > 0 &&
        item.subServer.map((item: any, index: any) =>{ 
          console.log('item',item?.is_favourite);
          
          return(
          <ThemedView
            key={index}
            style={[
              styles.countryView,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: Colors[theme].cartBg,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item?.flag }}
                style={styles.countryImgStyle} 
                resizeMode="cover"
              />
              <View style={{}}>
                <ThemedText type="defaultSemiBold" style={{}}>
                  {item?.countryName}
                </ThemedText>
                <ThemedText type="default" style={{ fontSize: ms(14) }}>
                  {item?.cityName}
                </ThemedText>
              </View>
            </View>
            <Pressable
              style={styles.likedBtn}
              onPress={() => {
                updateListApi({
                  country_id: item?._id,
                  user_id: user?.user_id
                }).unwrap();
              }}
            >
              <AntDesign
                name={!item?.is_favourite ? "staro" : "star"}
                size={ms(18)}
                color={!item?.is_favourite ?Colors[theme].text :  Colors.orange} 
              />
            </Pressable>
          </ThemedView>
        )})}
    </Collapsible>
  );
};

export default RenderCountry;

const styles = ScaledSheet.create({
  countryView: {
    padding: "12@ms",
    marginTop: "8@vs",
    borderRadius: "16@ms",
  },
  countryImgStyle: {
    width: "50@ms",
    height: "50@ms",
    marginRight: "10@ms",
    borderRadius: "50@ms",
  },
  likedBtn:{
    flexDirection: "row",
    alignItems: "center",
    gap:"10@ms",
    padding:"5@ms", 
  }
});
