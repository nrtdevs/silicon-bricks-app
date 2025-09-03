// components/GoogleMapView.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE } from "react-native-maps";

type GoogleMapViewProps = {
  latitude: number;
  longitude: number;
    address?: string;
    zoom?: number;
  height?: number;
    onLocationSelect?: (lat: number, lng: number, address: string) => void;
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  latitude,
  longitude,
    address,
    zoom = 14,
  height = 300,
    onLocationSelect,
}) => {
    const [marker, setMarker] = useState({
        lat: latitude,
        lng: longitude,
        address: address || "Selected Location",
    });

    // 🔹 Reverse Geocoding
    const fetchAddress = async (lat: number, lng: number) => {
        try {
            const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // better put in env
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.results?.length > 0) {
                return data.results[0].formatted_address;
            }
            return "Unknown Location";
        } catch {
            return "Address not found";
    }
  };

    const handleMapPress = async (e: MapPressEvent) => {
        const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate;
        const addr = await fetchAddress(lat, lng);
        setMarker({ lat, lng, address: addr });
        onLocationSelect?.(lat, lng, addr);
  };

  return (
      <View style={{ height }}>
          <MapView
              style={StyleSheet.absoluteFillObject}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 1 / zoom,
                  longitudeDelta: 1 / zoom,
        }}
              onPress={handleMapPress}
          >
              <Marker
                  coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                  title={marker.address}
                  description={`Lat: ${marker.lat.toFixed(4)}, Lng: ${marker.lng.toFixed(4)}`}
              />
          </MapView>
    </View>
  );
};

export default GoogleMapView;
