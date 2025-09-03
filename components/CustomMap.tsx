import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Alert,
    Platform,
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Circle,
    Polyline,
    Polygon,
} from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";


type GoogleMapViewProps = {
    latitude?: number;
    longitude?: number;
    address?: string;
    height?: number;
    showUserLocation?: boolean;
    onLocationSelect?: (lat: number, lng: number, address: string) => void;
    markers?: Array<{
        id: string;
        latitude: number;
        longitude: number;
        title?: string;
        description?: string;
        color?: string;
    }>;
    showControls?: boolean;
    enableDrawing?: boolean;
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
    latitude = 37.78825,
    longitude = -122.4324,
    address = "Unknown location",
    height = 300,
    showUserLocation = true,
    onLocationSelect,
    markers = [],
    showControls = true,
    enableDrawing = false,
}) => {
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
        address: string;
    } | null>(null);
    const [drawingMode, setDrawingMode] = useState<"circle" | "polyline" | "polygon" | null>(null);
    const [circle, setCircle] = useState<{ center: { latitude: number; longitude: number }; radius: number } | null>(null);
    const [polyline, setPolyline] = useState<Array<{ latitude: number; longitude: number }>>([]);
    const [polygon, setPolygon] = useState<Array<{ latitude: number; longitude: number }>>([]);

    // Request location permission and get user's current location
    useEffect(() => {
        (async () => {
            if (showUserLocation) {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission denied", "Location permission is required to show your location on the map");
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                // Center map on user location if no other location is provided
                if (!latitude || !longitude) {
                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            }
        })();
    }, [showUserLocation]);

    // Update region when props change
    useEffect(() => {
        if (latitude && longitude) {
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [latitude, longitude]);

    const handleMapPress = async (event: any) => {
        const { coordinate } = event.nativeEvent;

        if (drawingMode) {
            if (drawingMode === "circle") {
                setCircle({ center: coordinate, radius: 1000 });
            } else if (drawingMode === "polyline") {
                setPolyline([...polyline, coordinate]);
            } else if (drawingMode === "polygon") {
                setPolygon([...polygon, coordinate]);
            }
            return;
        }

        if (onLocationSelect) {
            // In a real app, you would use a geocoding service here
            const newAddress = `Selected Location: ${coordinate.latitude.toFixed(6)}, ${coordinate.longitude.toFixed(6)}`;

            setSelectedLocation({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                address: newAddress,
            });

            onLocationSelect(coordinate.latitude, coordinate.longitude, newAddress);
        }
    };

    const animateToUserLocation = () => {
        if (userLocation) {
            mapRef.current?.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        }
    };

    const animateToSelectedLocation = () => {
        if (selectedLocation) {
            mapRef.current?.animateToRegion({
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        }
    };



    return (
        <View style={{ height, position: "relative" }}>
            <MapView
                ref={mapRef}
                style={[StyleSheet.absoluteFillObject, styles.map]}
                provider={PROVIDER_GOOGLE}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={handleMapPress}
                showsUserLocation={showUserLocation}
                showsMyLocationButton={false}
                showsCompass={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
            >
                {/* User location marker */}
                {showUserLocation && userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="Your Location"
                        pinColor="red"
                    />
                )}

                {/* Selected location marker */}
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        title="Selected Location"
                        description={selectedLocation.address}
                    />
                )}

                {/* Custom markers */}
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                        pinColor={marker.color || "red"}
                    />
                ))}

                {/* Drawing features */}
                {circle && (
                    <Circle
                        center={circle.center}
                        radius={circle.radius}
                        fillColor="rgba(255,0,0,0.3)"
                        strokeColor="rgba(255,0,0,0.8)"
                        strokeWidth={2}
                    />
                )}

                {polyline.length > 0 && (
                    <Polyline
                        coordinates={polyline}
                        strokeColor="#000"
                        strokeWidth={3}
                    />
                )}

                {polygon.length > 0 && (
                    <Polygon
                        coordinates={polygon}
                        fillColor="rgba(0,128,0,0.3)"
                        strokeColor="rgba(0,128,0,0.8)"
                        strokeWidth={2}
                    />
                )}
            </MapView>

            {showControls && (
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={animateToUserLocation}
                    >
                        <MaterialIcons name="my-location" size={24} color="black" />
                    </TouchableOpacity>

                    {selectedLocation && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={animateToSelectedLocation}
                        >
                            <MaterialIcons name="place" size={24} color="black" />
                        </TouchableOpacity>
                    )}


                </View>
            )}

            {drawingMode && (
                <View style={styles.drawingHint}>
                    <Text style={styles.hintText}>
                        Tap on the map to add {drawingMode === "circle" ? "a circle" : drawingMode === "polyline" ? "a line point" : "a polygon point"}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    controls: {
        position: "absolute",
        top: 16,
        right: 16,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    map: {
        borderRadius: 20,
        backgroundColor: 'red'
    },
    controlButton: {
        padding: 8,
        marginVertical: 4,
        backgroundColor: "#f8f8f8",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    activeButton: {
        backgroundColor: "#ddd",
    },
    drawingHint: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    hintText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default GoogleMapView;
