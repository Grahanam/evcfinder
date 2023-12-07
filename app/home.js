import { Text,View,Pressable } from 'react-native';
import { Link, router } from 'expo-router';
// import { useSession } from '../authprovider/ctx';
// import {useSelector} from 'react-redux'

export default function Page() {
  // const {token}=useSelector((state)=>state.auth)
  // const {signOut}=useSession()
  return (
    <View>
        <Link href="/" asChild>
            <Pressable>
                <Text>Go back</Text>
            </Pressable>
            </Link>
            <Link href="/auth" asChild>
            <Pressable>
                <Text>Go to Auth</Text>
            </Pressable>
            </Link>
        <Text>/home</Text>
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