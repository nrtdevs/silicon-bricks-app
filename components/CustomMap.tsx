import React, { useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Platform, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use react-native-vector-icons

type CustomMapProps = {
  latitude: number;
  longitude: number;
  height?: number;
  zoom?: number;
  onMapClick?: (lat: number, lng: number, address: string) => void;
  showZoomControls?: boolean;
};

const CustomMap: React.FC<CustomMapProps> = ({
  latitude,
  longitude,
  height = 300,
  zoom = 13,
  onMapClick,
  showZoomControls = true,
}) => {
  const webViewRef = useRef<WebView>(null);

  // Update map when coordinates change
  useEffect(() => {
    if (webViewRef.current) {
      const script = `
        if (window.map && window.marker) {
          var newLatLng = [${latitude}, ${longitude}];
          map.setView(newLatLng, ${zoom});
          marker.setLatLng(newLatLng);
          
          // Update popup with new location
          (function() {
            fetch("https://apis.mapmyindia.com/advancedmaps/v1/uqyarlgtrfyopiiryieprrpclbqlekjyrkfx/rev_geocode?lat=${latitude}&lng=${longitude}")
              .then(res => res.json())
              .then(data => {
                let address = data?.results?.[0]?.formatted_address || "Unknown Location";
                marker.bindPopup(address).openPopup();
              })
              .catch(() => {
                marker.bindPopup("Failed to fetch address").openPopup();
              });
          })();
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [latitude, longitude, zoom]);

  const zoomIn = () => {
    if (webViewRef.current) {
      const script = `
        if (window.map) {
          map.zoomIn();
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const zoomOut = () => {
    if (webViewRef.current) {
      const script = `
        if (window.map) {
          map.zoomOut();
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const resetView = () => {
    if (webViewRef.current) {
      const script = `
        if (window.map && window.marker) {
          map.setView([${latitude}, ${longitude}], ${zoom});
          marker.setLatLng([${latitude}, ${longitude}]);
        }
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
          #map { width: 100%; height: 100%; touch-action: manipulation; }
          
          /* Custom zoom controls */
          .leaflet-control-zoom {
            border: 2px solid rgba(0,0,0,0.2);
            background-clip: padding-box;
          }
          
          .leaflet-control-zoom a {
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            color: #000;
            font-size: 18px;
            line-height: 26px;
          }
          
          .leaflet-control-zoom a:hover {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var lat = ${latitude || 28.6139};
            var lng = ${longitude || 77.2090};

            window.map = L.map('map', {
              zoomControl: false, // We'll add custom zoom control or use default
              gestureHandling: true,
              doubleClickZoom: true,
              scrollWheelZoom: true,
              touchZoom: true,
              boxZoom: true
            }).setView([lat, lng], ${zoom});

            // Add default zoom control
            L.control.zoom({
              position: 'topright'
            }).addTo(map);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19
            }).addTo(map);

            window.marker = L.marker([lat, lng], {
              draggable: true
            }).addTo(map);

            // Enable gesture zooming
            map.touchZoom.enable();
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();

            // Function to perform reverse geocoding
            function reverseGeocode(latitude, longitude, callback) {
              fetch("https://apis.mapmyindia.com/advancedmaps/v1/uqyarlgtrfyopiiryieprrpclbqlekjyrkfx/rev_geocode?lat=" + latitude + "&lng=" + longitude)
                .then(res => res.json())
                .then(data => {
                  let address = data?.results?.[0]?.formatted_address || "Unknown Location";
                  callback(address);
                })
                .catch(() => {
                  callback("Failed to fetch address");
                });
            }

            // Initial marker popup
            reverseGeocode(lat, lng, (address) => {
              marker.bindPopup(address).openPopup();
            });

            // Click on map to move marker
            map.on('click', function(e) {
              var clickedLat = e.latlng.lat;
              var clickedLng = e.latlng.lng;

              // Update marker position
              marker.setLatLng([clickedLat, clickedLng]);

              // Perform reverse geocoding for the clicked location
              reverseGeocode(clickedLat, clickedLng, (address) => {
                marker.bindPopup(address).openPopup();
                // Send data back to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({ 
                  lat: clickedLat, 
                  lng: clickedLng, 
                  addr: address 
                }));
              });
            });

            // Also allow dragging the marker
            marker.on('dragend', function(e) {
              var position = marker.getLatLng();
              reverseGeocode(position.lat, position.lng, (address) => {
                marker.bindPopup(address).openPopup();
                window.ReactNativeWebView.postMessage(JSON.stringify({ 
                  lat: position.lat, 
                  lng: position.lng, 
                  addr: address 
                }));
              });
            });

            // Add gesture handling for better mobile experience
            map.on('zoomstart', function() {
              // Zoom started
            });

            map.on('zoomend', function() {
              // Zoom ended
            });
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
        onMapClick?.(data.lat, data.lng, data.addr || "Unknown Location");
      }
    } catch (error) {
      console.error("Error parsing WebView message:", error);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        ref={webViewRef}
        style={styles.map}
        source={{ html: mapHtml }}
        originWhitelist={["*"]}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mixedContentMode="always"
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      
      {showZoomControls && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
            <Ionicons name="remove" size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={resetView}>
            <Ionicons name="locate" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomMap;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: 'relative',
  },
  map: {
    width: "100%",
    height: "100%",
    ...Platform.select({
      android: {
        opacity: 0.99,
      },
    }),
  },
  controlsContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 5,
    gap: 5,
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});