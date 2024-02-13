import React from 'react';

type Logouted = {
    handleGoogleLogin: () => Promise<void>;
}

export const Logouted = (props:Logouted)=>{
    const {handleGoogleLogin} = props
    return (
        <>
            <button onClick={handleGoogleLogin}>Sign Up</button>
            <h2>ログアウトしました</h2>
        </>
    )
}