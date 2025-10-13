import type { ApiResponse } from "@/model/api-common";
import type { UserModel } from "@/model/User.model"
import { AUTH } from "@/services/api/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type AuthError, type User } from "firebase/auth"


const registerUser = async (userData: UserModel): Promise<ApiResponse<User>> => {
  try {
    const response = await createUserWithEmailAndPassword(
      AUTH,
      userData.email,
      userData.password
    );

    return {
      success:true,
      data: response.user
    }
  } catch (error) {
    const authError = error as AuthError;
    console.log("error",error)
    return {
        success: false,
        error:{
            code:authError.code,
            message: authError.message
        }
    }
  }



};

const loginUser = async(userData: UserModel): Promise<ApiResponse<User>> => {
  try {
    const response =  await signInWithEmailAndPassword(AUTH,userData.email,userData.password)
    if (!response.user.uid){
      throw new Error("Problem in signing in");
    }
    return {
      success:true,
      data: response.user
    }

  } catch (error) {
     const authError = error as AuthError
    return {
      success:false,
      error:{ 
        code: authError.code,
        message: authError.message
      }
    }
  }
}
export {
    registerUser,
    loginUser
}