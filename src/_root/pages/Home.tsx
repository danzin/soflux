
import Loader  from '@/components/shared/Loader'
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'
import PostCard from '@/components/shared/PostCard'
import RightSideBar from '@/components/shared/RightSideBar'

const Home = () => {
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers();
  const { data: posts, isLoading: isPostLoading } = useGetRecentPosts()
  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
            {isPostLoading && !posts ? 
            ( <Loader />) 
          : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post: Models.Document) => (
               <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
            )}
        </div>
      </div>

      {isUserLoading ? (<div className='hidden xl:flex min-w-[100px]'><Loader /></div>) : <RightSideBar users={users} />}

    </div>
  )
}

export default Home