import type { ApiResponse } from "@/model/api-common";
import { getCollectionRef } from "@/utils/firebaseUtils";
import type { AuthError } from "firebase/auth";
import { addDoc } from "firebase/firestore";

const addProfile = async<T>(dbName:string, data:T) :Promise<ApiResponse<T>> => {
    try {
        const colRef = getCollectionRef<T>(dbName);
        const response = await addDoc(colRef, data);
       return {
         success: true,
         data: response.id as T,
       };
    } catch (error) {
        const authError = error as AuthError
         return {
           success: true,
           error: {
             code: authError.code,
             message : authError.message
           },
         };
    }
}
export {
    addProfile
}