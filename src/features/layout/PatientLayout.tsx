import SideBar from '@/components/layout/SideBar'
import SideBarList from '@/utils/sideBarList'
import React from 'react'
import { Outlet } from 'react-router'

const PatientLayout = () => {
  return (
     <>
        <SideBar sideBarList={SideBarList} userType='Patient'>
           <Outlet/> 
        </SideBar>
     </>
  )
}

export default PatientLayout