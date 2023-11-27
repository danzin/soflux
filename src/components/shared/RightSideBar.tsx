import React from 'react'
import UserCard from './UserCard'
import { Models } from 'appwrite'

type RightSideBarProps = {
  users?: Models.DocumentList<Models.Document>;

}

const RightSideBar = ({users} : RightSideBarProps) => {
  return (
    <div className='rightsidebar'>
      <div className='flex flex-col gap-11 overflow-y-auto '>
        <h2 className='h3-bold md:h2-bold text-left w-full'>Top Creators</h2>
        <ul className='grid grid-cols-2 gap-6'>
          {users?.documents.map((user: Models.Document) => (
            <UserCard user={user} key={user.username}/>
          ))}
       
        </ul>
      </div>
    </div>
  )
}

export default RightSideBar