import React from 'react';

type Logined = {
    handleLogout: () => Promise<void>;
    name: string | null;
}

export const Logined = (props:Logined)=>{
    const {handleLogout,name} = props
    return (
        <>
            <button onClick={handleLogout}>LogOut</button>
            <h2>{name}</h2>
        </>
    )
}