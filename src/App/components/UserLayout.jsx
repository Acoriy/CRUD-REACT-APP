import React from 'react'
import { Link , BrowserRouter , Routes , Route, Outlet } from 'react-router-dom'
import UserTable from './UserTable'
import UserAdd from './UserAdd'
import UserDelete from './UserDelete'
import UserEdite from './UserEdite'
const UserLayout = () => {
  return (
    <>
      

      <BrowserRouter>
          <nav>
         <ul className='nav bg-primary justify-content-center'>
             <li className='nav-items'>
                <Link to={'/'} className='nav-link text-light'>Liste Users</Link>
             </li>
             <li className='nav-items'>
                <Link to={'/user/create'} className='nav-link text-light'>Add Users</Link>
             </li>
         </ul>
       </nav>

         <Routes>
              <Route index element={<UserTable/>}/>
              <Route path='/user/create' element={<UserAdd/>}/>
              <Route path='/user/:id/update' element={<UserEdite/>}/>
              <Route path='/user/:id/delete' element={<UserDelete/>}/>
              
              {/* <Route index element={</>}/> */}
         </Routes>
      </BrowserRouter>

      <Outlet/>
    </>
  )
}

export default UserLayout
