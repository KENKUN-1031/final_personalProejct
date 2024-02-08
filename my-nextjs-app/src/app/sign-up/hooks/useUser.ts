import { AuthProvider, User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { SignupService } from '../usecase/signupService'
import { useCustomRouter } from '@/hooks/useCustomRouter'
import { FirebaseRepository } from '@/repo/firebaseRepo'
import { FirebaseInterface } from '@/types/interface/firebaseInterface'
import firebase from 'firebase/compat/app'

// class dummyRepo implements FirebaseInterface{
//   private static instance: FirebaseRepository | null = null
//   public static getInstance(): FirebaseRepository {
    
//     if (!this.instance) {
//         this.instance = new FirebaseRepository()
//     }
//     return this.instance
// }
//   public getUId = async (): Promise<string> => {
//     return await "userID"
//   }
// }

export const useUser = () => {
  const [isLogined,setIsLogined] = useState()
  const [user,setUser] = useState<User|null>(null)
  // const [testList, setList]= useState<string[]>(["",""])
  const [count,setCount]= useState<number>(0)
  const signupRep = new FirebaseRepository()
  
  //ここで依存性注入してる
  const signupService = new SignupService(signupRep);
  const {handlePushRouter} = useCustomRouter()
  // const [count2,setCount2]=useState(0)
  
  const handleIncremment = ()=>{
    // setCount(count + 1)
    setCount((prevState)=>prevState+1);
  }
  const handleMinus = ()=>{
    setCount(prevState => prevState-1);
  }
  
  const handleGoogleLogin = async () => {
    try {
      const firebaseUser = await signupService.authGoogle();
      if(firebaseUser){
        setUser(firebaseUser)
      }      
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async() => {
    try {
      await signupService.signOut();
      setUser(null);
      handlePushRouter("/");
    } catch (error) {
      console.log(error)
    }

  }
  //下でreturnで返してあげてる
  return {handleGoogleLogin,user,count,handleIncremment, handleMinus, handleLogout}
}