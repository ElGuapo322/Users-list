import React, {ReactElement, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase-config"
import './LoginPage.css'
import {useNavigate} from 'react-router-dom'



export const LoginPage=():ReactElement=>{
    const [isNewUser, setIsNewUser] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [error, setError] = useState('')

    const loginEmailHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginEmail(event.target.value)
    }
    const loginPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginPassword(event.target.value)
    }
    const regEmailHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRegEmail(event.target.value)
    }
    const regPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setRegPassword(event.target.value)
    }
    const loginToRegistration = ():void => {
        setIsNewUser(!isNewUser)
    }
    const registration = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword)
        }catch(error){
           const result = (error as Error).message
            setError(result)
        }

    }
    const login = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        }catch(error){
            const result = (error as Error).message
            setError(result)
        }

    }
    return(
        <div>
            {isNewUser ? (
                <div className={'form-wrapper'}>
                    <div className={'title'}>LOG IN</div>
                <form onSubmit={login}>
                    <input placeholder={'Email...'} value={loginEmail} onChange={loginEmailHandler} type="email"/>
                    <input placeholder={'Password...'} value={loginPassword} onChange={loginPasswordHandler} type="password"/>
                    <button type="submit">Log In</button>
                </form>
                    <div className={'error'}>{error}</div>
                    <div className={'link'} onClick={loginToRegistration}>Dont have an account? Click here to sign up</div>
                </div>
            ) : (
                <div className={'form-wrapper'}>
                <div className={'title'}>REGISTRATION</div>
                <form onSubmit={registration}>
                    <input placeholder={'Email...'} value={regEmail} onChange={regEmailHandler} type="email"/>
                    <input placeholder={'Password...'} value={regPassword} onChange={regPasswordHandler} type="password"/>
                    <button type="submit">Sign Up</button>
                </form>
                    <div className={'error'}>{error}</div>
                    <div className={'link'} onClick={loginToRegistration}>Already have an account? Click here to log in</div>
            </div>
            )}
        </div>

    )
}

