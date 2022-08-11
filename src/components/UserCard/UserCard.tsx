import React, {ReactElement} from 'react';
import "./UserCard.css"


interface IUserCardProps{
    id: number
    name: string
    userName: string
    email:string
    companyName: string
    website: string
    phone:string
    showModal:(arg0: boolean, arg1?: string | undefined, arg2?: string | undefined) => void
}



export const UserCard=({id,name, userName, email, companyName,website,phone, showModal}:IUserCardProps):ReactElement=>{

    const showCardModal = ()=>{
        showModal(true, id.toString(), 'edit')
    }
    const showCardDeleteModal = ()=>{
        showModal(true, id.toString(), 'delete')
    }


    return (
        <>

        <div className={'card-wrapper'}>
            <div className={'card-title'}>
                {userName}
            </div>
            <div className={'card-info'}>
                <div className={'card-info__row'}>
                    <span className={'card-info__row-title'}>Name: </span><span>{name}</span>
                </div>
                <div className={'card-info__row'}>
                    <span className={'card-info__row-title'}>Email: </span><span>{email}</span>
                </div>
                <div className={'card-info__row'}>
                    <span className={'card-info__row-title'}>Company: </span><span>{companyName}</span>
                </div>
                <div className={'card-info__row'}>
                    <span className={'card-info__row-title'}>Phone: </span><span>{phone}</span>
                </div>
                <div className={'card-info__row'}>
                    <span className={'card-info__row-title'}>Website: </span><span>{website}</span>
                </div>

            </div>
            <div className={'card-actions'}>
                <div className={'button-wrapper'}>
                    <div onClick={showCardModal} id={id.toString()} className={'edit-button'}>Edit</div>
                    <div onClick={showCardDeleteModal} id={id.toString()} className={'delete-button'}>Delete</div>
                </div>
            </div>
        </div>

        </>
    )
}