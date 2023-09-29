import { Image } from 'expo-image';
import {StyleSheet, Text, View} from 'react-native'

export default function DefaultPage(){
    return <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
                style={{ flex: 1, aspectRatio: 0.7, resizeMode: 'contain' }}
                source={require('../../assets/images/can_logo.png')}
            />
        </View>
        <View style={styles.part}></View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#184D39'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    part: {
        flex: 1
    }
})
