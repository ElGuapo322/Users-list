import React, {ReactElement, useState, useEffect} from 'react';
import './Navbar.css'
import {auth} from "../../firebase-config"
import {onAuthStateChanged, signOut} from "firebase/auth"
import { User as FirebaseUser } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {usersSlice} from "../../store/reducers/usersReducer";
import {useAppDispatch} from "../../hooks/redux";




export const Navbar=():ReactElement=>{
    const navigate = useNavigate()
     const [user, setUser] = useState< FirebaseUser| null>(null)
    const {setAuth} = usersSlice.actions
    const dispatch = useAppDispatch()

    onAuthStateChanged(auth, (currentUser)=>{
             setUser(currentUser)
        if(user){
            dispatch(setAuth(true))

        }
    })


    const logout = async ()=>{
       await signOut(auth)
        dispatch(setAuth(false))
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
