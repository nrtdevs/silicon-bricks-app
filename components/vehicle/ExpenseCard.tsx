import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from '../ThemedText';

interface VehicleCardProps {
  item: any;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
  onView: () => void;
  dots: React.ReactNode;
  status?: React.ReactNode; // 👈 custom UI
}

interface DetailRowProps {
  icon: 'location' | 'pricetag' | 'calendar';
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

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  onPress,
  bgColor,
}) => {
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

const ExpenseCard: React.FC<VehicleCardProps> = ({
  item,
  onEdit,
  onDelete,
  onChangeStatus,
  onView,
  dots,
  status,
}) => {
  if (!item) return null;

  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.98,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
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
          backgroundColor: Colors[theme].cart,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.contentContainer}
      >
        {/* Header with status */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText type="title" style={styles.brandText}>
              Vehicle : {item?.item?.vehicle?.model}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.modelText}>
              Amount : {item?.item?.amount}
            </ThemedText>
          </View>

          {/* 👇 Custom status from props */}
          {status && <View style={styles.statusWrapper}>{status}</View>}

          <View style={styles.dotsContainer}>{dots}</View>
        </View>

        {/* Divider */}
        <View
          style={[styles.divider, { backgroundColor: Colors[theme].border }]}
        />

        {/* Vehicle Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="pricetag"
            label="Type"
            value={item?.item?.expenseType}
            theme={theme}
          />
          <DetailRow
            icon="calendar"
            label="Date"
            value={item?.item?.expenseDate}
            theme={theme}
          />
        </View>

        {/* Action Buttons */}
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

export default ExpenseCard;

const styles = ScaledSheet.create({
  container: {
    borderRadius: '20@ms',
    marginHorizontal: '16@ms',
    marginVertical: '10@ms',
    padding: '0@ms',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: '16@ms',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10@vs',
  },
  titleContainer: {
    flex: 1,
  },
  brandText: {
    fontSize: '18@ms',
    marginBottom: '2@vs',
  },
  modelText: {
    fontSize: '14@ms',
    opacity: 0.8,
    textTransform: 'capitalize',
  },
  statusWrapper: {
    marginHorizontal: ms(6),
  },
  divider: {
    height: 1,
    marginVertical: '10@vs',
    opacity: 0.5,
  },
  detailsContainer: {
    marginBottom: '15@vs',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8@vs',
  },
  detailIcon: {
    marginRight: '8@ms',
    opacity: 0.7,
  },
  detailLabel: {
    fontSize: '12@ms',
    marginRight: '4@ms',
    opacity: 0.8,
  },
  detailValue: {
    fontSize: '12@ms',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '8@vs',
    paddingHorizontal: '12@ms',
    borderRadius: '10@ms',
    flex: 1,
    marginHorizontal: '4@ms',
  },
  actionButtonText: {
    color: Colors.white,
    marginLeft: '6@ms',
    fontSize: '12@ms',
    fontWeight: '500',
  },
  dotsContainer: {
    padding: '8@ms',
  },

  // ✅ Status badge styles
  badge: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(4),
    borderRadius: ms(12),
    color: Colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontSize: ms(12),
  },
  badgeSuccess: {
    backgroundColor: '#10B981',
  },
  badgeWarning: {
    backgroundColor: '#F59E0B',
  },
  badgeSecondary: {
    backgroundColor: '#6B7280',
  },
  badgeDanger: {
    backgroundColor: '#EF4444',
  },
});
