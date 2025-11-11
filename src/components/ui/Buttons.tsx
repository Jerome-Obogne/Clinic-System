import Button from '@mui/material/Button'
import React from 'react'

type BtnProps = {
    children?: React.ReactNode,
    className?: string | undefined
    icon?: React.ReactNode
    isDisabled?:boolean,
    size?: 'small' | 'medium' | 'large'
    variant?: 'text' | 'outlined' | 'contained'
    type?: 'submit' 
    onClick?: () => void
} 

const Buttons = (props: BtnProps) => {
  return (
    <>
      <Button
        type={props.type || "button"}
        disabled={props.isDisabled}
        className={props.className}
        size={props.size || "small"}
        onClick={props.onClick}
        sx={{
          "&:hover": {
            backgroundColor: "var(--color-tertiary)",
            color: "black",
          },
        }}
        data-testid="datad"
      >
        {props.icon}
        {props.children}
      </Button>
    </>
  );
}

export default Buttons