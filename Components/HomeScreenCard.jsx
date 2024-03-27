import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function HomeScreenCard({ title, description, imageSource, onPress }) {
  return (
    <View style={styles.componentWrapperContainer}>
      <View style={styles.complaintWrapper}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
          <Text style={styles.complaintHeadingText}>{title}</Text>
          <Image source={imageSource} style={styles.resizeComplainLogo}></Image>
        </View>
        <Text style={styles.complaintText}>{description}</Text>
        <TouchableOpacity onPress={onPress} style={styles.NewComplainButton}>
          <Text style={styles.NewButtonText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentWrapperContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
  },
  complaintWrapper: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#8a71bf",
    borderStyle: "solid",
    minHeight: 200,
  },
  complaintHeadingText: {
    fontFamily: 'Montserrat_700Bold',
    flexWrap: "wrap",
    color: '#180640',
    fontSize: 30,
    textAlign: "center",
  },
  complaintText: {
    fontFamily: 'Montserrat_400Regular',
    marginTop: 20,
    flexWrap: "wrap",
    color: '#100c17',
    fontSize: 18,
  },
  resizeComplainLogo: {
    width: 50,
    height: 50, 
    padding: 5,
  },
  NewComplainButton: {
    margin: 10,
    backgroundColor: "#8c1b2a",
    alignSelf: "flex-end",
    borderRadius: 10,
    padding: 10,
  },
  NewButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default HomeScreenCard;
