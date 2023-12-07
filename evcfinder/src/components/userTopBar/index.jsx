import React from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import PropTypes from 'prop-types'
import { useSelector,useDispatch  } from 'react-redux'
import { logout } from '../../features/auth/authslice'


const TopUserBar = () => {
    const dispatch=useDispatch()
    const {username}=useSelector((state)=>state.auth)
    
    return(
    <View style={styles.topBar}>
        <Text>
            {`Welcome, ${username}`}
        </Text>
        <Button
            title="Logout"
            type="clear"
            icon={{
                name: 'exit-to-app',
                size: 25,
                color: 'lightblue',
            }}
            iconRight
            onPress={() =>{dispatch(logout())}}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex:2,
        backgroundColor: '#fff',
        flex: 1,
        paddingLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

// TopUserBar.propTypes = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.func.isRequired,
//     }).isRequired,
// }

export default TopUserBar