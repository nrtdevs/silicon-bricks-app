import React, { PropsWithChildren, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { SvgIcons } from "@/assets";
import { Image } from "expo-image";

export function Collapsible({
  children,
  title,
  subtitle,
  url,
  isArrow,
  style,
  onPress,
  logo,
  onLike,
  liked,
}: PropsWithChildren & {
  title: string;
  subtitle: string;
  url?: string;
  isArrow?: boolean;
  style?: any;
  onPress?: () => void;
  logo?: boolean;
  onLike?: () => void;
  liked?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  return (
    <ThemedView style={style}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          setIsOpen((value) => !value)
          onPress && onPress?.();
        }}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: ms(10) }}>
          {url && <Image
            source={{ uri: url }}
            style={styles.countryImgStyle}
            contentFit="fill"
          />}
          {
            logo && <SvgIcons.Crypto1
              width={ms(40)}
              height={ms(40)}
              fill={Colors[theme].background}
            />
          }
          <View style={{ bottom: ms(5) }}>
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
            <ThemedText type="default" style={{ fontSize: ms(14) }}>{subtitle}</ThemedText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {!logo &&
          <Pressable  
            style={{
              padding: ms(5),  
            }}
          onPress={() => {
            onLike && onLike?.();
          }}>
          <AntDesign
            name={!liked ? "staro" : "star"}
            size={ms(18)}
            color={!liked ? Colors[theme].text:  Colors.orange}
           
          /> 
          </Pressable>
          }
          {isArrow && <Entypo name={isOpen ? "chevron-thin-up" : "chevron-thin-down"} size={ms(17)} color={Colors[theme].text} />}
        </View>
      </TouchableOpacity>
      {isOpen && <>{children}</>}
    </ThemedView>
  );
}

const styles = ScaledSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  countryImgStyle: {
    width: "50@ms",
    height: "50@ms",
    marginRight: "10@ms",
    borderRadius: "50@ms",
  },
});
