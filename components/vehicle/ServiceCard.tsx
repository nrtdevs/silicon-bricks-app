import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from '../ThemedText';

interface VehicleCardProps {
  brand: string;
  model: string;
  chassisNumber: string;
  number: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'breakdown' | 'maintenance';
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
  onView: () => void;
}

const statusColors: Record<VehicleCardProps['status'], readonly [string, string]> = {
  active: ['#10B981', '#059669'],
  inactive: ['#EF4444', '#DC2626'],
  breakdown: ['#F59E0B', '#D97706'],
  maintenance: ['#3B82F6', '#2563EB']
};

const statusIcons = {
  active: 'checkmark-circle',
  inactive: 'close-circle',
  breakdown: 'warning',
  maintenance: 'construct'
} as const;

const ServiceCard: React.FC<VehicleCardProps> = ({brand,model,chassisNumber,  number,status,onEdit,onDelete,onChangeStatus,onView,}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.98,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleValue }],
          borderColor: Colors[theme].border,
          shadowColor: Colors[theme].shadow,
          backgroundColor: Colors[theme].cart
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleExpand}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.contentContainer}
      >
        {/* Header with status badge */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText type='title' style={styles.brandText}>{brand}</ThemedText>
            <ThemedText type='subtitle' style={styles.modelText}>{model}</ThemedText>
          </View>

          <LinearGradient
            colors={statusColors[status]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statusBadge}
          >
            <Ionicons
              name={statusIcons[status]}
              size={ms(12)}
              color={Colors.white}
              style={styles.statusIcon}
            />
            <ThemedText style={styles.statusText} type='default'>
              {status.toUpperCase()}
            </ThemedText>
          </LinearGradient>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: Colors[theme].border }]} />

        {/* Vehicle Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="finger-print"
            label="Chassis No:"
            value={chassisNumber}
            theme={theme}
          />
          <DetailRow
            icon="car-sport"
            label="Vehicle No:"
            value={number}
            theme={theme}
          />
        </View>

        {/* Expandable Action Buttons */}
        <Animated.View>
          <View style={styles.actionsRow}>
            <ActionButton
              icon="eye"
              text="View"
              bgColor="#10B981"
              onPress={onView}
            />
            <ActionButton
              icon="create-outline"
              text="Edit"
              bgColor="#3B82F6"
              onPress={onEdit}
            />
            <ActionButton
              icon="swap-vertical"
              text="Status"
              bgColor="#8B5CF6"
              onPress={onChangeStatus}
            />
            <ActionButton
              icon="trash"
              text="Delete"
              bgColor="#EF4444"
              onPress={onDelete}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface DetailRowProps {
  icon: 'finger-print' | 'car-sport' | 'calendar';
  label: string;
  value: string;
  theme: 'light' | 'dark';
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value, theme }) => (
  <View style={styles.detailRow}>
    <Ionicons
      name={icon}
      size={ms(14)}
      color={Colors[theme].text}
      style={styles.detailIcon}
    />
    <ThemedText type="default" style={styles.detailLabel}>
      {label}
    </ThemedText>
    <ThemedText type="defaultSemiBold" style={styles.detailValue}>
      {value}
    </ThemedText>
  </View>
);

interface ActionButtonProps {
  icon: 'eye' | 'create-outline' | 'swap-vertical' | 'trash';
  text: string;
  bgColor: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon,text,onPress,bgColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionButton, { backgroundColor: bgColor }]}
    >
      <Ionicons name={icon} size={ms(16)} color={Colors.white} />
      <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = ScaledSheet.create({
  container: {
    borderRadius: "20@ms",
    marginHorizontal: "16@ms",
    marginVertical: "10@ms",
    padding: "0@ms",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: "16@ms",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: "10@vs",
  },
  titleContainer: {
    flex: 1,
  },
  brandText: {
    fontSize: "18@ms",
    marginBottom: "2@vs",
  },
  modelText: {
    fontSize: "14@ms",
    opacity: 0.8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "10@ms",
    paddingVertical: "4@vs",
    borderRadius: "20@ms",
  },
  statusIcon: {
    marginRight: "4@ms",
  },
  statusText: {
    fontSize: "10@ms",
    color: Colors.white,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginVertical: "10@vs",
    opacity: 0.5,
  },
  detailsContainer: {
    marginBottom: "15@vs",
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "8@vs",
  },
  detailIcon: {
    marginRight: "8@ms",
    opacity: 0.7,
  },
  detailLabel: {
    fontSize: "12@ms",
    marginRight: "4@ms",
    opacity: 0.8,
  },
  detailValue: {
    fontSize: "12@ms",
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: "8@vs",
    paddingHorizontal: "12@ms",
    borderRadius: "10@ms",
    flex: 1,
    marginHorizontal: "4@ms",
  },
  actionButtonText: {
    color: Colors.white,
    marginLeft: "6@ms",
    fontSize: "12@ms",
    fontWeight: '500',
  },
  miniActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: "8@ms",
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  miniActionButton: {
    padding: "4@ms",
  },
});
