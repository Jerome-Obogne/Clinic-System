import type { ApiResponse } from "@/model/api-common";
import { getCollectionRef } from "@/utils/firebaseUtils";
import type { AuthError } from "firebase/auth";
import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { DB } from "./firebaseConfig";

const addProfile = async<T>(dbName:string, data:T) :Promise<ApiResponse<T>> => {
    try {
        const colRef = getCollectionRef<T>(dbName);
        const response = await addDoc(colRef, data);
        if (!response) {
          throw new Error("Add Profile fail, please try again")
        }
       return {
         success: true,
         data: response.id as T,
       };
    } catch (error) {
        const authError = error as AuthError
         return {
           success: false,
           error: {
             code: authError.code,
             message : authError.message
           },
         };
    }
}


const getSingleDoc = async<T>(dbName: string , id:string ): Promise<ApiResponse<T> | undefined> => {

  try {
    const docRef = doc(DB,dbName,id)
    const response = await getDoc(docRef)
    console.log("RESPONSE GET SINGLE DOC", response.data())
    if (!response) {
      throw new Error("Failed to get single data ")
    }
    return {
      success: true,
      data: response.data() as T
    } 

  } catch (error) {
    const {code,message} = error as AuthError
    return { 
      success:false, 
      error: {
        code: code,
        message: message
      }
    }
  }

}

const getUpdateDoc = async<T extends object>(tableName:string, id:string | null | undefined , data:T): Promise<ApiResponse<T>> => {

  try {
    const docRef = doc(DB, tableName, id as string);
    await updateDoc(docRef, {...data});
    return {
      success: true,
    };
  } catch (error) {
    console.log("ERRORRRRRRR")
    const {code ,message} = error as AuthError;
    return {
       success:false,
       error: {
        code: code,
        message :message
       }
    }
  }
  
}

const getDocuments = async<T>(dbName: string): Promise<ApiResponse<T[]>> =>{
  try {
      const collections = getCollectionRef(dbName); 
      const response = await getDocs(collections);
      const records = response.docs.map((result) => {
        return {
           ...result.data() as T,
          id:result.id,        
         
        }
      })
      return {
        success: true,
        data: records,
      }; 

  } catch (error) {
      const {code,message} = error as AuthError
      return {
          success:false,
          error:{
            code: code,
            message:message
          }
      }
  }

}


export {
    addProfile,
    getSingleDoc,
    getUpdateDoc,
    getDocuments
}