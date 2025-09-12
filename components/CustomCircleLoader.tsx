import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View
} from "react-native";

const ProLevelLoader = ({ 
  size = 80, 
  dotSize = 12, 
  dotCount = 12,
  colors = ['#4287F5', '#42A5F5', '#42C3F5', '#42F5F5'],
  showText = true,
  loadingText = "Loading...",
  glowEffect = true 
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Main rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        useNativeDriver: true,
      })
    ).start();

    // Pulse effect for the container
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Text breathing effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0.6,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Enhanced dots with gradient colors and advanced positioning
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / dotCount;
    const radius = (size - dotSize) / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // Calculate dynamic dot size and opacity
    const dynamicSize = dotSize - (i * 1.5) / dotCount;
    const opacity = 1 - (i * 0.7) / dotCount;
    
    // Cycle through colors
    const colorIndex = i % colors.length;
    const baseColor = colors[colorIndex];
    
    // Convert hex to rgba for opacity
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const dotColor = hexToRgba(baseColor, opacity);
    const glowColor = hexToRgba(baseColor, opacity * 0.6);

    return (
      <View
        key={i}
        style={[
          styles.dot,
          {
            width: Math.max(dynamicSize, 4),
            height: Math.max(dynamicSize, 4),
            borderRadius: Math.max(dynamicSize, 4) / 2,
            backgroundColor: dotColor,
            top: size / 2 + y - Math.max(dynamicSize, 4) / 2,
            left: size / 2 + x - Math.max(dynamicSize, 4) / 2,
            shadowColor: glowEffect ? baseColor : 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: opacity * 0.8,
            shadowRadius: glowEffect ? 8 : 0,
            elevation: glowEffect ? 5 : 0,
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Main loader container with pulse effect */}
        <Animated.View
          style={[
            styles.loaderContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.dotsContainer,
              {
                width: size,
                height: size,
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            {dots}
            
            {/* Center glow effect */}
            {glowEffect && (
              <View
                style={[
                  styles.centerGlow,
                  {
                    width: size * 0.3,
                    height: size * 0.3,
                    borderRadius: (size * 0.3) / 2,
                    top: size * 0.35,
                    left: size * 0.35,
                  },
                ]}
              />
            )}
          </Animated.View>
          
          {/* Outer ring effect */}
          <View
            style={[
              styles.outerRing,
              {
                width: size + 20,
                height: size + 20,
                borderRadius: (size + 20) / 2,
              },
            ]}
          />
        </Animated.View>

        {/* Loading text with breathing effect */}
        {showText && (
          <Animated.Text
            style={[
              styles.loadingText,
              {
                opacity: textOpacity,
              },
            ]}
          >
            {loadingText}
          </Animated.Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loaderContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    position: "relative",
  },
  dot: {
    position: "absolute",
  },
  centerGlow: {
    position: "absolute",
    backgroundColor: "rgba(66, 135, 245, 0.2)",
    shadowColor: "#4287F5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  outerRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(66, 135, 245, 0.3)",
    backgroundColor: "transparent",
    top: -10,
    left: -10,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    letterSpacing: 0.8,
    textAlign: "center",
  },
});

// Usage example with different configurations
export const LoaderVariants = {
  // Classic blue loader
  classic: (
    <ProLevelLoader 
      size={80}
      dotCount={12}
      colors={['#4287F5']}
      loadingText="Loading..."
    />
  ),
  
  // Colorful gradient loader
  rainbow: (
    <ProLevelLoader 
      size={100}
      dotCount={16}
      colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']}
      loadingText="Processing..."
      glowEffect={true}
    />
  ),
  
  // Minimalist loader
  minimal: (
    <ProLevelLoader 
      size={60}
      dotCount={8}
      colors={['#2C3E50']}
      showText={false}
      glowEffect={false}
    />
  ),
  
  // Large premium loader
  premium: (
    <ProLevelLoader 
      size={120}
      dotCount={20}
      colors={['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']}
      loadingText="Please wait..."
      glowEffect={true}
    />
  ),
};

export default ProLevelLoader;
