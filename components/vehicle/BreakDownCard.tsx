import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { Breakdown_Status } from '@/graphql/generated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from '../ThemedText';

interface ServiceItem {
  vehicle: {
    model: string;
  };
  breakdownType: string;
  longitude: string;
  latitude: string;
  status: Breakdown_Status
}

interface VehicleCardProps {
  item: ServiceItem;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
  onView: () => void;
}

const statusColors: Record<Breakdown_Status, readonly [string, string]> = {
  [Breakdown_Status.Approved]: ['#10B981', '#059669'],
  [Breakdown_Status.Assigned]: ['#3B82F6', '#2563EB'],
  [Breakdown_Status.Cancelled]: ['#EF4444', '#DC2626'],
  [Breakdown_Status.InService]: ['#3B82F6', '#2563EB'],
  [Breakdown_Status.Pending]: ['#F59E0B', '#D97706'],
  [Breakdown_Status.Rejected]: ['#EF4444', '#DC2626'],
  [Breakdown_Status.RepairFailed]: ['#EF4444', '#DC2626'],
  [Breakdown_Status.Repaired]: ['#10B981', '#059669'],
  [Breakdown_Status.ServiceScheduled]: ['#8B5CF6', '#7C3AED'],
};

const statusIcons: Record<Breakdown_Status, keyof typeof Ionicons.glyphMap> = {
  [Breakdown_Status.Approved]: 'checkmark-circle',
  [Breakdown_Status.Assigned]: 'person-add',
  [Breakdown_Status.Cancelled]: 'close-circle',
  [Breakdown_Status.InService]: 'hammer',
  [Breakdown_Status.Pending]: 'time',
  [Breakdown_Status.Rejected]: 'alert-circle',
  [Breakdown_Status.RepairFailed]: 'warning',
  [Breakdown_Status.Repaired]: 'build',
  [Breakdown_Status.ServiceScheduled]: 'calendar',
};


interface DetailRowProps { icon: 'location'; label: string; value: string; theme: 'light' | 'dark'; }

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

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, onPress, bgColor }) => {
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

const BreakDownCard: React.FC<VehicleCardProps> = ({ item, onEdit, onDelete, onChangeStatus, onView }) => {
  if (!item) {
    return null; 
  }

  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const currentStatus: Breakdown_Status = item.status && statusColors[item.status] ? item.status : Breakdown_Status.Pending;

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
            <ThemedText type='title' style={styles.brandText}>Model : {item?.vehicle?.model}</ThemedText>
            <ThemedText type='subtitle' style={styles.modelText}>Type : {item?.breakdownType}</ThemedText>
          </View>

          <LinearGradient
            colors={statusColors[currentStatus]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statusBadge}
          >
            <Ionicons
              name={statusIcons[currentStatus]}
              size={ms(12)}
              color={Colors.white}
              style={styles.statusIcon}
            />
            <ThemedText style={styles.statusText} type='default'>
              {currentStatus.toUpperCase()}
            </ThemedText>
          </LinearGradient>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: Colors[theme].border }]} />

        {/* Vehicle Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="location"
            label="Longitude"
            value={String(parseFloat(item?.longitude).toFixed(2))}
            theme={theme}
          />
          <DetailRow
            icon="location"
            label="Latitude"
            value={String(Math.round(parseFloat(item?.latitude)))}
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

export default BreakDownCard;

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
    flexDirection: 'row',
    justifyContent: 'space-around'
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
