import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IState, IUser} from "../../interface/interface";


const initialState: IState = {
    users: [],
    isLoading: true,
    error:'',
    isAuth: false,
}

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async function(_,{rejectWithValue}){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            if(!response.ok){
                throw new Error("Error with data fetching")
            } else return data
        }catch (error){
             const result = (error as Error).message
             return rejectWithValue(String(result))
        }
    }
    )

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        deleteUser(state, action:PayloadAction<number>){
            const newUsers = state.users.filter(user => user.id !== action.payload)
            state.users = newUsers
        },
        addUser(state, action:PayloadAction<IUser>){
            state.users.push(action.payload)
        },
        editUser(state, action:PayloadAction<IUser>){
            let index
           state.users.map((user) =>
           {
              if(user.id === action.payload.id){
                  index = state.users.indexOf(user)
              }
           })
            if(index){
                state.users[index] = action.payload
            }

        },
        searchFilter(state, action:PayloadAction<string>){
            const newUsers = state.users.filter((user)=> user.username.includes(action.payload))
            state.users = newUsers
        },
        setAuth(state, action:PayloadAction<boolean>){
            state.isAuth = action.payload
        }

    },
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.pending, (state:IState)=>{
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state:IState,action:PayloadAction<IUser[]>)=>{
            state.isLoading = false
            state.users = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state:IState,action:PayloadAction<string | unknown>)=>{
            state.isLoading = false
            state.error = <string>action.payload

        })

        }

})

export default usersSlice.reducer