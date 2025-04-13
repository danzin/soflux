import {Outlet, Navigate} from 'react-router-dom'

const AuthLayout = () => {
  const isAuth = false;

  return (
    <>
    {isAuth ? (
      <Navigate to='/'/>
    ):(
      <>
        <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <Outlet/>
        </section>
        <img 
          src='/assets/images/background_dark.jpg'
          alt='logo'
          className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
        />
      </>
    )}
    </>
  )
}

export default AuthLayout