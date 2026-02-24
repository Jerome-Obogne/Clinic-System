import Avatar from "@mui/material/Avatar";
type AvatarProps = {
    first_name?: string | undefined
    src?:string
    size?:number
}

const ProfileAvatar = ({first_name,src,size}: AvatarProps) => {
  return (
    <>
    <Avatar src={src || ""}  sx={{width:size || 45, height:size || 45}} >
      { src ? src : first_name?.slice(0,1).toUpperCase()}
    </Avatar>
    </>
  )
}

export default ProfileAvatar;