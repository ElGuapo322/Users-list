import React, {ReactElement, useState, useEffect} from 'react';
import './Navbar.css'
import {auth} from "../../firebase-config"
import {onAuthStateChanged, signOut} from "firebase/auth"
import { User as FirebaseUser } from "firebase/auth";
import {useNavigate} from "react-router-dom"



export const Navbar=():ReactElement=>{
    const navigate = useNavigate()
     const [user, setUser] = useState< FirebaseUser| null>(null)

    onAuthStateChanged(auth, (currentUser)=>{
             setUser(currentUser)
    })
    useEffect(()=>{
        if(user){
            navigate('/')
        } else{
            navigate('/login')
        }
    },[user])

    const logout = async ()=>{
       await signOut(auth)
        navigate('/')
    }

    return (
        <div className={'navbar'}>
            <div className={'navbar-user'}>
                {user?.email || 'New User'}
            </div>
            {user && (
                <div onClick={logout} className={'navbar-logout'}>
                    LOGOUT
                </div>
            )}
        </div>
    )
}
