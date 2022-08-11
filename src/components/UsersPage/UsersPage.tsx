import React, {ReactElement, useEffect, useState} from 'react';
import {fetchUsers} from "../../store/reducers/usersReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {UserCard} from "../UserCard/UserCard";
import "./UserPage.css"
import {Modal} from "../Modal/Modal";
import{IUser} from "../../interface/interface";
import {useNavigate} from 'react-router-dom'


export const UsersPage=():ReactElement=>{
    const dispatch = useAppDispatch()
    const {users, isAuth} = useAppSelector(state => state.usersReducer)
    const [modalOpen, setIsModalOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')
    const [target, setTarget] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [filtered, setFiltered] = useState<IUser[]>([])
    const navigate = useNavigate()

    const showModal = (state:boolean, id:string | undefined, target:string | undefined):void=>{
        setIsModalOpen(state)
        setSelectedCard(id || '')
        setTarget(target||'')
        if (state === true){
            document.body.style.overflow = 'hidden'
        } else if(state === false){
            document.body.style.overflow = 'visible'
        }
    }
    const addUser = () =>{
        setIsModalOpen(true)
        setTarget("add")
        document.body.style.overflow = 'hidden'
    }
    const search = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchInput(event.target.value)
        const arr = users.filter((item) =>
            event.target.value
                .toLowerCase()
                .split(' ')
                .every((word) => item.username.toLowerCase().startsWith(word))
        );
        setFiltered(arr)
    }

    useEffect(()=>{
        if(!isAuth){
            navigate('/')
        } else dispatch(fetchUsers())
    },[])


    return (
        <>
            <div className={'page-actions'}>
                <button className={'page-actions__button'} onClick={addUser}>Add user</button>
                <input className={'page-actions__input'} onChange={search} placeholder={'Search by name...'} type={'text'}/>
            </div>

        <div className={'page-wrapper'}>

            { (users.length>0 && searchInput.length === 0) && users.map((user)=>(
                <UserCard
                    id={user.id}
                    name={user.name}
                    userName={user.username}
                    email={user.email}
                    companyName={user.company.name}
                    website={user.website}
                    phone={user.phone}
                    showModal={showModal}
                    key={user.id}

                />

            )) }
            { (filtered && searchInput !== '') && filtered.map((user)=>(
                <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    userName={user.username}
                    email={user.email}
                    companyName={user.company.name}
                    website={user.website}
                    phone={user.phone}
                    showModal={showModal}

                />

            )) }
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    showModal={showModal}
                    id={selectedCard}
                    target={target}
                />
            )
            }

        </div>
            </>
    )
}