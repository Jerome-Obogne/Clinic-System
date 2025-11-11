import React from 'react'
import Container from '@mui/material/Container';
type ContainerProps = {
    maxWidth: 'sm' | 'md' | 'lg' | 'xl'
    paddingValue?: string
    children?: React.ReactNode
}


const Containers = ({maxWidth,paddingValue,children}:ContainerProps) => {
  return (
    <>
      <Container maxWidth ={maxWidth || 'md'} sx={{padding: paddingValue || '30px'}} >
        {children}
      </Container>
    </>
  )
}

export default Containers