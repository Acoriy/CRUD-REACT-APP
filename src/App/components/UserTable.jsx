import React, { useContext, useRef, useState } from 'react'
import { ContextUsers } from './UserApp'
import { Link } from 'react-router-dom'

const UserTable = () => {
   const Context = useContext(ContextUsers)
   const searchValue = useRef()
   const [value , setValue] = useState('')
   
   const displayUser = ()=>{
    const  search = Context.users.filter((user)=>{
         return user.NomComplet.includes(value) ||
                user.Ville.includes(value) ||
                user.Email.includes(value) ||
                user.Age.includes(value)
    })
    if(search.length > 0){
       return search.map((userSearch , key) => <tr>
           <td key={key}>{userSearch.id}</td>
           <td key={key}>{userSearch.NomComplet}</td>
           <td key={key}>{userSearch.Age}</td>
           <td key={key}>{userSearch.Email}</td>
           <td key={key}>{userSearch.Ville}</td>
           <td>
              <Link  to={`/user/${userSearch.id}/update`} className='btn btn-outline-primary me-4'>Modifier</Link>
              <Link to={`/user/${userSearch.id}/delete`} className='btn btn-outline-danger'>Suprimer</Link>
           </td>
       </tr>)
    }
     
   }

   const handleSearch = (e)=>{
      e.preventDefault()
      setValue(searchValue.current.value)
   }


  return (
   <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-dark'>
      <div className='container bg-light rounded'>
     <form className='row m-3 ms-5 p-3' onSubmit={handleSearch}> 
        <input type="text" className='col-5 form-control w-25 ' placeholder='Cherche User ...' ref={searchValue} />
        <button className='col-1 btn btn-outline-primary ms-4'>Recherche</button>
     </form>
     <hr />
       <table className='table table-striped table-invers table-responsive table-hover w-75 mt-5 mb-5' align={'center'}>
          <thead>
             <tr>
              <th>Id</th>
              <th>Nom Complete</th>
              <th>Age</th>
              <th>Email</th>
              <th>Ville</th>
              <th>Options</th>
             </tr>
          </thead>
          <tbody>
              {displayUser()}
          </tbody>
       </table>
    </div>
   </div>
    
  )
}

export default UserTable
