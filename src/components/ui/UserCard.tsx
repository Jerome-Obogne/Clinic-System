import React from 'react'

type UserCardProps = {
    title?:string
    children? : React.ReactNode
}

const UserCard = ({ title,children }: UserCardProps) => {
  return (
    <div className="bg-[var(--color-quarternary)]!">
      <h1 className="text-white text-base sm:text-sm md:text-[22px] p-5">
        {title}
      </h1>
      <div className="shadow-md bg-white h-auto p-6 rounded-md rounded-t-[40px]">
        {children}
      </div>
    </div>
  );
};

export default UserCard