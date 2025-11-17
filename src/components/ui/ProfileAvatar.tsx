import Avatar from "@mui/material/Avatar";
type AvatarProps = {
    first_name: string | undefined
}

const ProfileAvatar = ({first_name}: AvatarProps) => {
  return (
    <>
    <Avatar>
      {first_name?.slice(0,1).toUpperCase()}
    </Avatar>
    </>
  )
}

export default ProfileAvatar;