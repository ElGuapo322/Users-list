export interface IUserCompany {
    name: string
    catchPhrase?: string
    bs?:string
}
export interface IUserAddress{
    street: string
    suite: string
    city: string
    zipcode:string
    geo:IUserGeo
}
export interface IUserGeo{
    lat: string
    lng: string
}

export interface IUser {
    address?: IUserAddress
    company: IUserCompany
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}
export interface IState {
    users: IUser[]
    isLoading: boolean
    error: string[]
}

export const initialState: IState = {
    users: [],
    isLoading: false,
    error:[]
}

