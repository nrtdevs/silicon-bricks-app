import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';

const Project = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#0a54c9", "#5087de"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Name</Text>
            <Text style={styles.cardDot}>:</Text>
            <Text style={styles.cardDot}>Work</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Organization</Text>
            <Text style={styles.cardDot}>:</Text>
            <Text style={styles.cardDot}>test dd</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Status</Text>
            <Text style={styles.cardDot}>:</Text>
            <Text style={styles.cardDot}>Pending</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.cardDot}>:</Text>
            <Text style={styles.cardDot}>Pending sdfs</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Action</Text>
            <Text style={styles.cardDot}>: </Text>
            <Feather name="edit" color="white" size={24} />
          </View>
        </LinearGradient>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => alert("Button pressed")}>
        <Feather name="plus" color="white" size={24}></Feather>
      </TouchableOpacity>
    </View>
  );
};

export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    width: 110,
    color: "white",
    fontWeight: "500",
  },
  cardDot: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "normal",
  },
  fab: {
    position: "absolute",
    bottom: 20, 
    right: 20, 
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#0a54c9",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3, 
  },
});