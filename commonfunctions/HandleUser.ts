import  UserType  from '@/assets/types/UserType';
import axios from "axios";




export async function fetchUser(email:string,assword:string) {
    try {
        return await axios.get(process.env.EXPO_PUBLIC_STREAMZ_BACKEND_URL + `user/search?email=${email}`)
    } catch (error) {
        console.log('Something went wrong while fetching the user: ',error)        
    }
}

export async function saveUser(user:UserType) {
    try {
        return await axios.post(process.env.EXPO_PUBLIC_STREAMZ_BACKEND_URL + `user/saveUser`,user)
    } catch (error) {
        console.log('Something went wrong while saving user : ',error)        
    }
}