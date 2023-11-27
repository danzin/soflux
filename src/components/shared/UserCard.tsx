import { Button } from '../ui/button'
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

type UserCardProps = {
  user: Models.Document;
} 
const UserCard = ({user} : UserCardProps) => {
  return (
    <div className='user-card'>
      <div className='flex flex-col gap-3'>
        <Link to={`/profile/${user.$id}`} className='self-center'>
        <img src={ user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="profilepic"
        width={58}
        height={58}
        className='self-center rounded-full w-20 lg:h-20' />
        </Link>
        <h3 className='self-center text-center base-medium lg:body-bold text-light-1'>{user.name}</h3>
        <p className='self-center subtle-semibold lg:small-regular'>{user.bio}</p>
      </div>
    <Button className='shad-button_primary'>Follow</Button>
    </div>
  )
}

export default UserCard