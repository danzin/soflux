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
        width={12}
        height={12}
        className='self-center rounded-full w-14 h-14' />
        </Link>
        <h3 className='self-center text-center body-medium-bold  text-light-1'>{user.name}</h3>
        <p className='self-center subtle-semibold'>{user.bio}</p>
      </div>
    <Button className='shad-button_primary'>Follow</Button>
    </div>
  )
}

export default UserCard