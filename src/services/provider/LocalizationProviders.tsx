import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const LocalizationProviders = ({children}: {children:React.ReactNode}) => {
  return (
    <>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider> 
    </>
  )
}

export default LocalizationProviders