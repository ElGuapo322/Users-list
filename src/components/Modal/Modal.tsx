import React, {ReactElement, useState, useEffect} from "react";
import "./Modal.css"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {usersSlice} from "../../store/reducers/usersReducer";

interface IModalProps{
    isOpen: Boolean
    showModal:(arg0: boolean, arg1?: string | undefined, arg2?: string) => void
    id: string
    target: string
}


export const Modal = ({isOpen, showModal, id, target}:IModalProps):ReactElement => {
    const dispatch = useAppDispatch()
    const {users} = useAppSelector(state => state.usersReducer)
    const {deleteUser, addUser, editUser} = usersSlice.actions
    const user = users.filter((user)=> user.id === Number(id))[0]

    const [userAlias, setUserAlias] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userCompany, setUserCompany] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userWebsite, setUserWebsite] = useState('')

    const userAliasHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserAlias(event.target.value)
    }
    const userNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value)
    }
    const userEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserEmail(event.target.value)
    }
    const userPhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserPhone(event.target.value)
    }
    const userCompanyHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserCompany(event.target.value)
    }
    const userWebsiteHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserWebsite(event.target.value)
    }

    const addNewUser = () =>{
        const newUser = {
            id: Math.random(),
            username: userAlias,
            name:userName,
            email: userEmail,
            phone: userPhone,
            website: userWebsite,
            company:{
                name: userCompany
            }
        }
        dispatch(addUser(newUser))
        showModal(false)
    }
    const changeUser = () => {
        const editedUser = {
            ...user,
            username: userAlias,
            name:userName,
            email: userEmail,
            phone: userPhone,
            website: userWebsite,
            company:{
                name: userCompany
            }
        }
        dispatch(editUser(editedUser))
        showModal(false)

    }

    const deleteUserHandler =()=>{
        dispatch(deleteUser(Number(id)))
        showModal(false)
    }
    useEffect(()=>{
        if(target==='edit'){
            setUserAlias(user.username)
            setUserName(user.name)
            setUserEmail(user.email)
            setUserCompany(user.company.name)
            setUserPhone(user.phone)
            setUserWebsite(user.website)
        }
    },[target])
    return (
        <>
            {target === 'delete' && (
                <>
                    <div className={"darkBG"} onClick={() => showModal(false)} />
                    <div className={'centered'}>
                        <div className={'modal'}>
                            <div className={'modalContent'}>
                                Are you sure you want to delete this user?
                            </div>
                            <div className={'modalActions'}>
                                <div className={'actionsContainer'}>
                                    <button className={'deleteBtn'} onClick={deleteUserHandler}>
                                        Delete
                                    </button>
                                    <button
                                        className={'cancelBtn'}
                                        onClick={() => showModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {target === 'edit' && (
                <>
                    <div className={"darkBG"} onClick={() => showModal(false)} />
                    <div className={'centered'}>
                        <div className={'modal'}>
                            <div className={'modal-title'}>Add User</div>
                            <input value={userAlias} onChange={userAliasHandler} placeholder={'user alias...'}/>
                            <input value={userName} onChange={userNameHandler} placeholder={'user name...'}/>
                            <input value={userEmail} onChange={userEmailHandler} placeholder={'user email...'}/>
                            <input value={userCompany} onChange={userCompanyHandler} placeholder={'user company...'}/>
                            <input value={userPhone} onChange={userPhoneHandler} placeholder={'user phone...'}/>
                            <input value={userWebsite} onChange={userWebsiteHandler} placeholder={'user website...'}/>
                            <div className={'modalActions'}>
                                <div className={'actionsContainer'}>
                                    <button className={'deleteBtn'} onClick={changeUser}>
                                        Apply
                                    </button>
                                    <button
                                        className={'cancelBtn'}
                                        onClick={() => showModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {target === 'add' && (
                <>
                    <div className={"darkBG"} onClick={() => showModal(false)} />
                    <div className={'centered'}>
                        <div className={'modal'}>
                            <div className={'modal-title'}>Add User</div>
                            <input value={userAlias} onChange={userAliasHandler} placeholder={'user alias...'}/>
                            <input value={userName} onChange={userNameHandler} placeholder={'user name...'}/>
                            <input value={userEmail} onChange={userEmailHandler} placeholder={'user email...'}/>
                            <input value={userCompany} onChange={userCompanyHandler} placeholder={'user company...'}/>
                            <input value={userPhone} onChange={userPhoneHandler} placeholder={'user phone...'}/>
                            <input value={userWebsite} onChange={userWebsiteHandler} placeholder={'user website...'}/>
                            <div className={'modalActions'}>
                                <div className={'actionsContainer'}>
                                    <button className={'deleteBtn'} onClick={addNewUser}>
                                        Add
                                    </button>
                                    <button
                                        className={'cancelBtn'}
                                        onClick={() => showModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

