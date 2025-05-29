// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
// import { ThemedView } from '../ThemedView';
// import { ms, ScaledSheet, vs } from 'react-native-size-matters';
// import { Colors } from '@/constants/Colors';
// import { useTheme } from '@/context/ThemeContext';
// import { ThemedText } from '../ThemedText';

// interface CustomRoleProps {
//     name: string;
//     permissions: string;
//     description: string;
//     editPermission: boolean;
//     deletePermission: boolean;
//     onEdit: () => void;
//     onDelete: () => void;
// }

// const CustomRole: React.FC<CustomRoleProps> = ({
// name,
// permissions,
// description,
// editPermission,
// deletePermission,
// onEdit,
// onDelete,
// }) => {
//     const { theme } = useTheme()
//     return (
//         <View
//             style={[styles.container, {
//                 borderColor: Colors[theme].border,
//                 shadowColor: Colors[theme].shadow,
//                 backgroundColor: Colors[theme].cart,

//             }]}
//         >
//             <View style={{}}>
//                 {/* Header */}
//                 <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6, width: 300 }}>
//                     <View>
//                         <ThemedText type='subtitle'>{name}</ThemedText>
//                     </View>
//                 </View>

//                 {/* Details */}
//                 <View style={{}}>
//                     <ThemedText type='defaultSemiBold' style={{ marginBottom: 4, width: 300, }}>
//                         <ThemedText type='subtitle' style={{ fontSize: ms(18), }}>Permissions:</ThemedText> {permissions}
//                     </ThemedText>
//                     {description.length > 0 && <ThemedText type='defaultSemiBold' style={{ marginBottom: 4, width: 300, }}>
//                         <ThemedText type='subtitle' style={{ fontSize: ms(18), }}>Description:</ThemedText> {description}
//                     </ThemedText>}
//                 </View>
//             </View>

//             {/* Action Buttons */}
//             <View style={{ gap: 20, flexDirection: 'row', marginTop: 15 }}>
//                 {editPermission && <ActionButton icon={<Feather name="edit" size={18} color={Colors.white} />} text="Edit" bgColor="#3B82F6" onPress={onEdit} />}
//                 {deletePermission && <ActionButton icon={<FontAwesome5 name="trash" size={18} color={Colors.white} />} bgColor="#EF4444" text="Delete" onPress={onDelete} />}
//             </View>

//         </View>
//     );
// };

// const ActionButton = ({
//     icon,
//     text,
//     onPress,
//     bgColor,
// }: {
//     icon: React.ReactNode;
//     text: string;
//     bgColor: string;
//     onPress: () => void;
// }) => {
//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingVertical: vs(8),
//                 paddingHorizontal: ms(12),
//                 borderRadius: 10,
//                 borderWidth: 0.5,
//                 borderColor: Colors.white,
//                 backgroundColor: bgColor,
//                 opacity: 0.8
//             }}
//         >
//             {icon}
//             {/* <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>{text}</Text> */}
//         </TouchableOpacity>
//     );
// };

// export default CustomRole;

// const styles = ScaledSheet.create({
//     container: {
//         borderRadius: "20@ms",
//         marginHorizontal: "12@ms",
//         marginVertical: "10@ms",
//         padding: "16@ms",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 5,
//         borderWidth: 1,
//         justifyContent: 'space-between',
//         gap: 10,
//     }
// })

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "../ThemedText";

interface CustomRoleProps {
  name: string;
  permissions: string;
  description: string;
  editPermission: boolean;
  deletePermission: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus?: () => void;
}

const CustomCard: React.FC<CustomRoleProps> = ({
  name,
  permissions,
  description,
  editPermission,
  deletePermission,
  onEdit,
  onDelete,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: Colors?.[theme]?.border,
          shadowColor: Colors[theme].shadow,
        },
      ]}
    >
      <View style={{ gap: vs(10) }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="user"
              size={ms(24)}
              color={Colors[theme]?.primary?.text}
            />
            <ThemedText style={{ marginLeft: ms(5) }} type="subtitle">
              {name}
            </ThemedText>
          </View>
        </View>

        {/* Details */}

        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedText style={{ color: Colors[theme]?.textSecondary }}>
              Permission:
            </ThemedText>
            <ThemedText
              style={{
                marginLeft: ms(10),
                color: Colors[theme]?.textSecondary,
              }}
            >
              {permissions}
            </ThemedText>
          </View>
          {description?.length > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedText style={{ color: Colors[theme]?.textSecondary }}>
                Description:
              </ThemedText>
              <ThemedText
                style={{
                  marginLeft: ms(10),
                  color: Colors[theme]?.textSecondary,
                }}
              >
                {description}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: vs(10),
            gap: ms(15),
            // justifyContent: "space-between",
          }}
        >
          {editPermission && (
            <ActionButton
              icon={<Feather name="edit" size={18} color={Colors.white} />}
              text="Edit"
              bgColor="#3B82F6"
              onPress={onEdit}
            />
          )}
          {deletePermission && (
            <ActionButton
              icon={
                <FontAwesome5 name="trash" size={18} color={Colors.white} />
              }
              text="Delete"
              bgColor="#EF4444"
              onPress={onDelete}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const ActionButton = ({
  icon,
  text,
  onPress,
  bgColor,
}: {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: vs(8),
        paddingHorizontal: ms(12),
        borderRadius: 10,
        backgroundColor: bgColor,
        opacity: 0.8,
      }}
    >
      {icon}
      <Text
        style={{
          color: "#fff",
          marginLeft: 8,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: "12@s",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
