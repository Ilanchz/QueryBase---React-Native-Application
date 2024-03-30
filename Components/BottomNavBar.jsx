import React from "react";
import { StyleSheet, View,TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BottomNavBar(props){

    const navigation = useNavigation();
    const userEmail=props.userEmail;
    function ComplaintChat(){
      navigation.navigate('ChatScreen',{userEmail:userEmail}); //Go to ChatScreen
    }

    return (
    <View style={styles.NavigationBarContainer}>
            <View style={styles.NavigationBarWrapper}>
              <TouchableOpacity>
                <Image source={props.source1} style={styles.resizeComplainLogo}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={ComplaintChat}>
                <Image source={props.source2} style={styles.resizeComplainLogo}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={props.source3} style={styles.resizeComplainLogo}></Image>
              </TouchableOpacity>
              
            </View>
    </View>
    );
}

const styles=StyleSheet.create({
    NavigationBarContainer: {
        width: "100%",
        backgroundColor: "#0c0326",
        zIndex: 100, // Should make this responsive to layout
        
      },
      NavigationBarWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      resizeComplainLogo: {
        width: 50,
        height: 50,
        padding: 5,
      },
});

export default BottomNavBar;