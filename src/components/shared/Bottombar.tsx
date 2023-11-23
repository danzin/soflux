import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
              <Link 
                to={link.route}
                key={link.label} className={` ${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 tranition`}>
                  <img 
                  src={link.imgURL} 
                  alt={link.label} 
                  className={`${isActive && 'invert-white' }`}
                  width={18}
                  height={18}/>
                <p className='tiny-medium text-light-2'>{link.label}</p>
              </Link>
          )
        })}
    </section>
  )
}

export default Bottombar