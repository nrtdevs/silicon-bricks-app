import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons'; 
import { ms, ScaledSheet, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext'; 
import { ThemedText } from './ThemedText';


interface VehicleCardProps {
  title: string;
  subtitle: string;
  breakDownDate: string; 
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
  onView: () => void;
}

const statusColors = {
  active: '#10B981',
  inactive: '#EF4444',
  pending: '#F59E0B'
};

const VehicleBreakdownCart = ({
  title,
  subtitle,
  breakDownDate, 
  createdAt,
  status,
  onEdit,
  onDelete,
  onChangeStatus,
  onView,
}:VehicleCardProps) => {
    const {theme} = useTheme()
  return (
      <View
      style={[styles.container, {
        borderColor: Colors[theme].border,
        shadowColor: Colors[theme].shadow,
        backgroundColor: Colors[theme].cart

      }]}
    >
      <View>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
          <View>
            <ThemedText type='subtitle'>{title}</ThemedText>
            <ThemedText type='default'>{subtitle}</ThemedText>
          </View>
          <View
            style={{
              backgroundColor: statusColors[status],
              paddingHorizontal: ms(10),
              padding: vs(2),
              borderRadius: ms(14),
            }}
          >
            <ThemedText style={{ fontSize: ms(10), color: Colors.white }} type='default'>{status.toUpperCase()}</ThemedText>
          </View>
        </View>

        <View style={{

          // show the dotted line
          borderStyle: 'dotted',
          borderWidth: 1,
          borderColor: Colors[theme].border,
          marginVertical: 10,
        }} />
        {/* Details */}
        <View style={{}}>
          <ThemedText type='defaultSemiBold' style={{ marginBottom: 4 }}>
            <ThemedText type='default'>BreakDown Date:</ThemedText> {breakDownDate}
          </ThemedText> 
          <ThemedText type='defaultSemiBold' style={{ marginBottom: 4 }}>
            <ThemedText type='default'>Created. Date:</ThemedText> {new Date(createdAt).toLocaleDateString()}
          </ThemedText>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ gap: 10 }}>
        <ActionButton icon={<FontAwesome5 name="eye" size={ms(14)} color={Colors.white} />} text="View" bgColor="#10B981" onPress={onView} />
        <ActionButton icon={<Feather name="edit" size={ms(16)} color={Colors.white}/>} text="Edit" bgColor="#3B82F6" onPress={onEdit} />
        <ActionButton icon={<MaterialIcons name="autorenew" size={ms(18)} color={Colors.white} />} bgColor="#8B5CF6" text="Status" onPress={onChangeStatus} />
        <ActionButton icon={<FontAwesome5 name="trash" size={ms(14)} color={Colors.white} />} bgColor="#EF4444" text="Delete" onPress={onDelete} />
      </View>

    </View>
  )
}

export default VehicleBreakdownCart

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: vs(8),
        paddingHorizontal: ms(12),
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.white,
        backgroundColor:bgColor,
        opacity: 0.8
      }}
    >
      {icon}
      {/* <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>{text}</Text> */}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    borderRadius: "20@ms",
    marginHorizontal: "16@ms",
    marginVertical: "10@ms",
    padding: "16@ms",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
