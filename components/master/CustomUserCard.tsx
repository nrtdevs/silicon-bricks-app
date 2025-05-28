import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather, Ionicons, Zocial, FontAwesome6 } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ms, ScaledSheet, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '../ThemedText';
import { TextInput } from 'react-native-paper';

interface CustomUserProps {
    name: string;
    status: 'active' | 'inactive' | 'pending' | 'blocked';
    email: string;
    mobileNo: string;
    editPermission: boolean;
    statusPermission: boolean;
    deletePermission: boolean;
    readPermission: boolean;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onChangeStatus: () => void;
}

const statusTextColorsOptions = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
    blocked: 'blocked',
};

const CustomUserCard: React.FC<CustomUserProps> = ({
    name,
    status,
    email,
    mobileNo,
    editPermission,
    statusPermission,
    deletePermission,
    readPermission,
    onView,
    onEdit,
    onDelete,
    onChangeStatus,
}) => {
    const { theme } = useTheme()
    return (
        <View
            style={[styles.container, {
                borderColor: Colors?.[theme]?.border,
                shadowColor: Colors[theme].shadow,
                backgroundColor: Colors[theme].cart,

            }]}
        >
            <View style={{ gap: vs(10) }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6, justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="user" size={ms(24)} color={Colors[theme]?.primary?.text} />
                        <ThemedText style={{ marginLeft: ms(5) }} type='subtitle'>{name}</ThemedText>
                    </View>
                    {readPermission && <MaterialIcons name="arrow-forward-ios" size={24} color={Colors[theme]?.text} onPress={onView} />}
                </View>

                {/* Status Badge */}
                <View style={{}}>
                    <View style={[styles.statusBadge, {
                        backgroundColor: Colors[theme]?.[statusTextColorsOptions[status]]?.bg,
                        borderColor: Colors[theme]?.[statusTextColorsOptions[status]]?.border
                    }]}>

                        <Text style={[styles.statusText, { color: Colors[theme]?.[statusTextColorsOptions[status]]?.text }]}>
                            {status.toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Details */}
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Zocial name="email" size={24} color={Colors[theme]?.textPrimary} />
                        <ThemedText style={{ marginLeft: ms(10), color: Colors[theme]?.textSecondary, justifyContent: 'center' }}>{email}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Feather name="phone-outgoing" size={24} color={Colors[theme]?.textPrimary} />
                        <ThemedText style={{ marginLeft: ms(10), color: Colors[theme]?.textSecondary, justifyContent: 'center' }}>{mobileNo}</ThemedText>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', marginTop: vs(10), justifyContent: 'space-between' }}>
                {editPermission && <ActionButton icon={<Feather name="edit" size={18} color={Colors.white} />} text="Edit" bgColor="#3B82F6" onPress={onEdit} />}
                {statusPermission && <ActionButton icon={<MaterialIcons name="autorenew" size={18} color={Colors.white} />} bgColor="#8B5CF6" text="Status" onPress={onChangeStatus} />}
                {deletePermission && <ActionButton icon={<FontAwesome5 name="trash" size={18} color={Colors.white} />} bgColor="#EF4444" text="Delete" onPress={onDelete} />}
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
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: vs(8),
                paddingHorizontal: ms(12),
                borderRadius: 10,
                backgroundColor: bgColor,
                opacity: 0.8
            }}
        >
            {icon}
            <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomUserCard;

const styles = ScaledSheet.create({
    container: {
        marginHorizontal: '12@s',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
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
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
})