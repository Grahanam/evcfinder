import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{ signUp:({username,password})=>void; signIn: ({username,password}) => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signUp:({username,password})=>{
          // fetch('https://fakestoreapi.com/auth/login',{
          //   method:'POST',
          //   body:JSON.stringify({
          //     username:username,
          //     password:password
          //   })
          // }).then(response=>response.json())
          // .then(response=>{
          //   console.log(response)
          //   return response
          // })
          console.log('sign up triggred')

        },
        signIn: async({username,password}) => {
          try{
            let response=await fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body:JSON.stringify({
              username:username,
              password:password
            })
          })
          const contentType=response.headers.get('content-type')
          if(contentType&&contentType.includes('text/html')){
            const htmlResponse=await response.text()
            // console.log(htmlResponse)
            return htmlResponse
          }else if(contentType&&contentType.includes('application/json')){
            const data=await response.json()
            console.log(data.token)
            return 'Success'
          }else{
            return 'unknown response'
          }
          }catch(err){
             console.log(err)
          }
          
          
          // .then(response=>response.json())
          // .then(response=>console.log(response))
          // Perform sign-in logic here
          // setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
