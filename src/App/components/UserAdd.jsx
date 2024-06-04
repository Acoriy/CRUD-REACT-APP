import React, { useContext, useRef, useState } from 'react'
import { ContextUsers } from './UserApp'
import Swal from 'sweetalert2'

const UserAdd = () => {
   const Context = useContext(ContextUsers)
   const NomComplet = useRef()
   const Age = useRef()
   const Email = useRef()
   const Ville = useRef()
   const [Erreurs , setErreurs] = useState([])

   // ------- validate pour tester : ----
   let validate = true
   
   // ------------- Traitement de la validation : --------
   const getErreurs = () => {
      // -------- values champs : -------
          const valueNomComplet = NomComplet.current.value
          const valueAge = Age.current.value
          const valueEmail = Email.current.value
          const valueVille = Ville.current.value
      
      if(valueNomComplet.trim() === ""){
          setErreurs(prevState => {
            return [...prevState , "NomComplte est obligatior !!!"]
         })
         validate = false
      }
      if(valueAge.trim() === ""){
         setErreurs(prevState => {
            return [...prevState , "Age est obligatoir !!!"]
         })
         validate = false
      }

      if(valueEmail.trim() === ""){
         setErreurs(prevState => {
            return [...prevState , "Email est obligatoir !!!"]
         })
         validate = false
      }
      else if(!valueEmail.match(/^\S+@\S+\.\S+$/)){
         setErreurs(prevState => {
            return [...prevState , "Email non Confirmé !!!"]
         })
         validate = false
      }

      if(valueVille.trim() === "vide"){
         setErreurs(prevState => {
            return [...prevState , "Choisie la ville de residence"]
         })
         validate = false
      }

      return validate
   }
   
   const handleAdd = (e)=>{
      e.preventDefault()
      setErreurs([])
      getErreurs()
      if(validate === false){
         return false
      }

      Context.actions.onAddUser({
      payload : {
         NomComplet : NomComplet.current.value,
         Age : Age.current.value,
         Email : Email.current.value ,
         Ville : Ville.current.value ,
         id : Context.lastId +1
      }
      })
      
      NomComplet.current.value = ""
      Age.current.value = ""
      Email.current.value = ""
      Ville.current.value = ""
      
      // alert('User Ajouter avec success !!!')
      Swal.fire({
         position: "top-center",
         icon: "success",
         title: "User Ajouter avec success !!!",
         showConfirmButton: false,
         timer: 2000
       });
      
 
   }
  
  return (
    <div className='d-flex w-100 vh-100 bg-dark text-light align-items-center justify-content-center'>
        <div className="bg-light w-50 rounded">
          <div className='bg-primary'>
            <h1 className="text-center text-light">Add User</h1>
          </div>
          <hr />
               {
                  Erreurs.length > 0 ? 
                   <div className='alert alert-danger'>
                     <strong>Erreurs : </strong>
                     <ul>
                       {Erreurs.map((erreur , key )=>{
                         return <li key={key}>{erreur}</li>})
                        }
                     </ul>
                   </div>
                   :
                   'success'
               }

          <form onSubmit={handleAdd}>
          <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Id : </label>
                <h2 className='col-5 form-control w-50 fw-bold fs-4'>{Context.lastId + 1}</h2>
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>NomComplete : </label>
                <input type="text" className='col-5 form-control w-50' placeholder='Enter votre nom ...' ref={NomComplet} />
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Age: </label>
                <input type="number" className='col-5 form-control w-50' placeholder='Enter votre Age ...' ref={Age} />
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Email : </label>
                <input type="text" className='col-5 form-control w-50' placeholder='Enter votre Email...' ref={Email} />
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Ville : </label>
                <select type="text" className='col-5 form-control w-50' placeholder='Choisie votre Ville ' ref={Ville} >
                     <option value="vide" selected>Choisie Votre Ville</option>
                     <option value="Agadir">Agadir</option>
                     <option value="Tanger">Tanger</option>
                     <option value="Taroudant">Taroudant</option>
                     <option value="Rabat">Rabat</option>
                     <option value="Marakech">Marakech</option>
                     <option value="Auther">Auther</option>
                </select>
             </div>
             <div className='d-flex justify-content-center'>
               <button className="btn btn-primary w-75  mb-4">Ajouter</button>
             </div>

          </form>
        </div>
    </div>
  )
}

export default UserAdd
