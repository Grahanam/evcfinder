import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'
import { View ,TouchableWithoutFeedback} from 'react-native'
import Panel from '../../components/Panel'

const SceneSplash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home')
        }, 2000)
    }, [])
    return(
        <TouchableWithoutFeedback onPress={() =>  navigation.replace('Home')}>
        <View style={styles.page}>
            <View style={styles.titleBox}>
                <Text style={styles.txt}>WELCOME!</Text>
            </View>
            <View style={styles.contentBox}>
                <Text style={styles.txt}>Touch Screen to start!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.txt}>developed by grahanam</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
    page: {
        textAlign:'center',
        color:'blue',
        width:'100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt:{
        color:'green',
        fontWeight:'700',
        fontSize:20
    },
    titleBox: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentBox: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

SceneSplash.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneSplash