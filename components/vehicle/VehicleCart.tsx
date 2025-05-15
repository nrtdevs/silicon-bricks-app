import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

interface VehicleCardProps {
  brand: string;
  model: string;
  chassisNumber: string;
  number: string;
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
  pending: '#F59E0B',
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  brand,
  model,
  chassisNumber,
  number,
  createdAt,
  status,
  onEdit,
  onDelete,
  onChangeStatus,
  onView,
}) => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        flexDirection:'row',
        justifyContent:'space-between'
      }}
    >
    <View>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end',gap:6}}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>{brand}</Text>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>{model}</Text>
        </View> 
         <View
          style={{
            backgroundColor: statusColors[status],
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>{status.toUpperCase()}</Text>
        </View>
      </View>

<View style={{

    // show the dotted line
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#E5E7EB',  
    marginVertical:10,
}} />
      {/* Details */}
      <View style={{ }}>
        <Text style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>
          <Text style={{ fontWeight: '600' }}>Chassis:</Text> {chassisNumber}
        </Text>
        <Text style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>
          <Text style={{ fontWeight: '600' }}>Number:</Text> {number}
        </Text>
        <Text style={{ fontSize: 14, color: '#374151' }}>
          <Text style={{ fontWeight: '600' }}>Created:</Text> {new Date(createdAt).toLocaleDateString()}
        </Text>
      </View>  
    </View>
    
    {/* Action Buttons */}
      <View style={{gap:10}}>
        <ActionButton icon={<FontAwesome5 name="eye" size={14} color="#fff" />} text="View" bgColor="#10B981" onPress={onView} />
        <ActionButton icon={<Feather name="edit" size={16} color="#fff" />} text="Edit" bgColor="#3B82F6" onPress={onEdit} />
        <ActionButton icon={<MaterialIcons name="autorenew" size={18} color="#fff" />} text="Status" bgColor="#8B5CF6" onPress={onChangeStatus} />
        <ActionButton icon={<FontAwesome5 name="trash" size={14} color="#fff" />} text="Delete" bgColor="#EF4444" onPress={onDelete} />
      </View>
     
    </View>
  );
};

const ActionButton = ({
  icon,
  text,
  bgColor,
  onPress,
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
        backgroundColor: bgColor,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
      }}
    >
      {icon}
      {/* <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>{text}</Text> */}
    </TouchableOpacity>
  );
};

export default VehicleCard;
