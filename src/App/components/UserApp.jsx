import React, { createContext, useState } from 'react'
import UserTable from './UserTable'
import UserAdd from './UserAdd'
import UserLayout from './UserLayout'

export const ContextUsers = createContext({
   users : [],
   lastId : 0 ,
   onAddUser : ()=> null ,
   onDeleteUser : ()=> null ,
   onUpdate : ()=> null
})
const UserApp = () => {
   const [users , setUsers] = useState([])
   const [lastId , setLastId] = useState(0)

   // ------------------ Ajouter : ---------------------
   
     const onAddUser = (data)=>{
     setUsers(prevState => [...prevState , data.payload])
     setLastId(prevState => prevState + 1)
     window.history.back()
   }
   // ----------------- Modifier : -------------------
   const onUpdate = (data)=>{
     const {id , ...reste } = data.payload
     setUsers(prevState => prevState.map(user => {
      if(user.id === id){
        return {id:user.id , ...reste}
      }
       return user
     }))
     
     window.history.back()
   }
   // ---------------------- Suprimer : -----------------
   const onDeleteUser = (data)=>{
      setUsers( prevState => prevState.filter(user => user.id !== parseInt(data.payload.id)))
      window.history.back()
   }
  return (
     
    <>
     <ContextUsers.Provider value={{ 
         users : users , 
         lastId : lastId,
         actions : {
           onAddUser,
           onUpdate ,
           onDeleteUser,
         }
      }}>
      <UserLayout/>
      </ContextUsers.Provider>
    </>
  )
}

export default UserApp
