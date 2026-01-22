import { getAppointmentSchemaArray, type AppointmentModel, type getAppointmentModel, } from "@/model/Appointment.model";
import { getDocuments } from "@/services/api/firebaseDb";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";


// create async thunk here and the api is in the api services
export const fetchAppointmentListAsync = createAsyncThunk<getAppointmentModel[],string>(
    "appointment/getAppointmentList", async(dbName: string,{rejectWithValue}) => {
        try {
           const response = await getDocuments<getAppointmentModel[]>(dbName);
           console.log(typeof getAppointmentSchemaArray.parse(response.data) )
           return getAppointmentSchemaArray.parse(response.data) ;  
        } catch (error) {
            console.log(error)
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
          
        }
    }
)

export type AppointmentList = {
    data: AppointmentModel[],
    loading :boolean,
    error: string | null
}
const initialState: AppointmentList ={
    data:[],
    loading:false,
    error: ''
}


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers:{
      
    },
    extraReducers: (builder) => { 
        builder
         .addCase(fetchAppointmentListAsync.fulfilled, (state, action:PayloadAction<getAppointmentModel[]>) => {  // this is typescript issues about the model that declare
            state.data = action.payload as AppointmentModel[]
            state.loading = false;
            state.error = null
        }).addCase(fetchAppointmentListAsync.pending,(state) => {
            state.loading = true
            state.error = null

        }).addCase(fetchAppointmentListAsync.rejected,(state,action)=> {
            state.error = action.error.message || 'Failed to fetch appointment list';
            state.loading = false ;
        })

        // Create appointment record
        // .addCase(fetchAppointmentListAsync.fulfilled,(state,action)=>{
            
        // }) 
    }
})


export default appointmentSlice.reducer