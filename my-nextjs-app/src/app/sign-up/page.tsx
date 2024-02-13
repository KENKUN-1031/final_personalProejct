"use client"
import React, {useEffect} from 'react';
import { initializeApp } from "firebase/app";
import {SignupService} from "@/app/sign-up/usecase/signupService";
import { useUser } from './hooks/useUser';
import { useCustomRouter } from '@/hooks/useCustomRouter';
import { Logined } from './components/SignUpLogined';
import { Logouted } from './components/SignUpLogouted';




const SignUpPage = () => {
// 分割代入 const {count} = useUser() <-(こうとも書ける)  const count = useUser().count
// useUser(hooks)からのreturnを受け取る準備↓
  const { user,handleGoogleLogin,count,handleIncremment,handleMinus, handleLogout, handleLaravelLogin } = useUser()
  const { handlePushRouter,handleBackRouter,IsActive } = useCustomRouter()
  console.log(typeof user?.email)
  // const handleLogin = () =>{
  //   handleGoogleLogin();
  //   handleLaravelLogin();
  // }
  return (
    <>
    <div>
      { user ? //ログインしてる際の処理↓
      // コンポーネントを呼び出してる↓
          <Logined handleLogout={handleLogout} name={user.displayName} />
        : //← の後ろがelse(ログインする処理を書く)
        // コンポーネントを呼び出してる
          <Logouted handleGoogleLogin={handleGoogleLogin} />
      }
    </div>
    <div>
      <h1 onClick={handleIncremment}>+</h1>
      <h1 onClick={handleMinus}>-</h1>
      <h2>{count}</h2>
      <h2 onClick={()=>handlePushRouter("/")}>Move to Index</h2>
    </div>
    </>
  );
};



export default SignUpPage;


