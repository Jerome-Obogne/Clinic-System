import React from 'react'
import Containers from './Containers'
import Grid from '@mui/material/Grid'


type AuthProps = {
    title: string,
    children?: React.ReactNode
}
const AuthForm = ({title, children}: AuthProps) => {
  return (
    <>
        <Containers maxWidth={'lg'}>
            <div className='flex justify-center content-center'>
                <div className='sm:w-[600px] md:w-[900px] lg:w-[950px] w-auto bg-[color:var(--color-quarternary)] rounded-sm mt-50'>
                  <Grid container  sx={{justifyContent:'space-between'}}>
                      <Grid size ={{xs:12,sm:4, md:4, lg:3}}>
                          <div className='p-10'>
                              <h4 className='text-lg font-normal text-white'>Where every visit is a step toward a brighter healthier future</h4>
                          </div>
                          <div className='relative  md:top-[-25px] md:left-[105px]  lg:left-40 ...'>
                            <div className=''>
                              <img src="/logo/Pediatric_Logo_v1.png" width={200} height={100}  alt= "System Image" className='m-auto w-[220px] md:w-[260px] lg:w-[280px]  h-auto max-w-full'/>
                            </div>
                          </div>
                      </Grid>
                      <Grid size ={{xs:12,sm:8, md:8, lg:9}} className="p-8 bg-[color:var(--color-tertiary)] rounded-tl-2xl">
                          <div className='text-shadow-black'>
                              <h1 className='text-center text-[30px] md:text-[40px] lg:text-[42px] font-medium antialiased...'>{title}</h1>
                          </div>
                          <div className='pt-10 ml-12 md:ml-14 lg:ml-32'>
                            {children}
                          </div>
                      </Grid>
                  </Grid>
                </div>
            </div>
        </Containers>
    </>
    
  )
}

export default AuthForm