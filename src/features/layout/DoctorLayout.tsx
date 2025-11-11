import SideBar from '@/components/layout/SideBar'
import SideBarList from '@/utils/sideBarList'
import { Outlet } from 'react-router'

const DoctorLayout = () => {

  return (
    <>
     <SideBar sideBarList={SideBarList} userType='Doctor'>
        <Outlet/>
     </SideBar>
    </>
  )
}

export default DoctorLayout