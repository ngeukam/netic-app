import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, icons } from '../constants';

const Header = ({ title, onPress }) => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Pressable 
              onPress={()=>navigation.toggleDrawer()}
              style={styles.iconContainer}>
                <Image
                  resizeMode='contain'
                  style={styles.icon}
                  source={icons.menu}
                />
            </Pressable>
            <Text style={{
                marginLeft: 12,
                fontSize: 17,
                fontWeight: 'bold',
            }}>{title}</Text>
        </View>
        <Pressable 
              onPress={onPress}
              style={styles.iconContainer}>
                <Image
                  resizeMode='contain'
                  style={styles.icon}
                  source={icons.more}
                />
            </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginTop: 20,
        // marginHorizontal: 16,
        paddingVertical:10,
        backgroundColor:COLORS.white
    },
    iconContainer: {
        height: 45,
        width: 45,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white
    },
    icon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    }
})
export default Header