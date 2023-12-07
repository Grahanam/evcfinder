import { Text,StyleSheet,View } from 'react-native';
import { Link, router } from 'expo-router';
// import { useSession } from '../../authprovider/ctx';
export default function Index() {
  // const {signOut}=useSession()
  return (
    <View style={styles.container}>
        <Link href="/home">Go to Home</Link>
        <Text>/</Text>
        <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          // signOut();
          router.push('/auth')
        }}>
        Sign Out
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    backgroundColor: '#fee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});