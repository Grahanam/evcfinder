import React from 'react'
import { View, StyleSheet } from 'react-native'
// import { Button } from 'react-native-elements'
import { Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'



const BottomNavBar = ({ navigation }) => (
    <View style={styles.bottomBar}>
        
        <Button
            title="All"
            type="clear"
            icon={(
                <Icon
                    name="address-card"
                    size={15}
                    color="lightblue"
                />
            )}
            onPress={() => navigation.replace('HomeAllProduct')}
        />

        <Button
            title="Apparel"
            type="clear"
            icon={(
                <Icon
                    name="address-card"
                    size={15}
                    color="lightblue"
                />
            )}
            onPress={() => navigation.replace('HomeApparel',{categoryName:'Apparel'})}
        />

        <Button
            title="Sports"
            type="clear"
            icon={(
                <Icon
                    name="address-card"
                    size={15}
                    color="lightblue"
                />
            )}
            onPress={() => navigation.replace('HomeSport',{categoryName:'Sport'})}
        />
        <Button
            title="Books"
            type="clear"
            icon={(
                <Icon
                    name="address-card"
                    size={15}
                    color="lightblue"
                />
            )}
            onPress={() => navigation.replace('HomeBook',{categoryName:'Book'})}
        />
    </View>
)

const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding:5,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})


// BottomNavBar.propTypes = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.func.isRequired,
//     }).isRequired,
// }

export default BottomNavBar