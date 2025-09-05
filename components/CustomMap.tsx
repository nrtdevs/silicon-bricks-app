import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE
} from "react-native-maps";


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
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
    latitude = 37.78825,
    longitude = -122.4324,
    address = "Unknown location",
    height = 300,
    showUserLocation = true,
    onLocationSelect,
    markers = [],
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

        if (onLocationSelect) {
            let newAddress = `Selected Location: ${coordinate.latitude.toFixed(6)}, ${coordinate.longitude.toFixed(6)}`;
            try {
                const geocodedAddress = await Location.reverseGeocodeAsync(coordinate);
                if (geocodedAddress && geocodedAddress.length > 0) {
                    const { street, name, city, region, country } = geocodedAddress[0];
                    newAddress = `${name || ''} ${street || ''}, ${city || ''}, ${region || ''}, ${country || ''}`.trim();
                }
            } catch (error) {
                console.error("Error reverse geocoding:", error);
            }

            setSelectedLocation({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                address: newAddress,
            });

            onLocationSelect(coordinate.latitude, coordinate.longitude, newAddress);
        }
    };

    const zoomIn = () => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2,
            longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
    };

    const zoomOut = () => {
        setRegion((prevRegion) => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta * 2,
            longitudeDelta: prevRegion.longitudeDelta * 2,
        }));
    };

    const goToUserLocation = () => {
        if (userLocation) {
            mapRef.current?.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        } else {
            Alert.alert("Location not available", "Could not retrieve your current location.");
        }
    };

    return (

        <View style={[styles.mapContainer, { height }]}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={handleMapPress}
                showsUserLocation={showUserLocation}
                showsMyLocationButton={false}
                showsCompass={false}
                zoomEnabled={true}
                zoomControlEnabled={false}
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
            </MapView>

            <View style={styles.addressOverlay}>
                <MaterialIcons name="location-pin" size={24} color="#4CAF50" />
                <Text style={styles.addressText}>
                    {selectedLocation ? selectedLocation.address : address}
                    </Text>
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={goToUserLocation}>
                    <MaterialIcons name="my-location" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
                    <MaterialIcons name="add" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
                    <MaterialIcons name="remove" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    mapContainer: {
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
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
        ...StyleSheet.absoluteFillObject,
    },
    addressOverlay: {
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    addressText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333",
        flexShrink: 1,
    },
    controlsContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
        gap: 10,
    },
    controlButton: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default GoogleMapView;
