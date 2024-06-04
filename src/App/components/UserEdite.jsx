import React, { useContext, useEffect, useRef, useState } from "react"
import { ContextUsers } from "./UserApp"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const UserEdite = () => {
  const Context = useContext(ContextUsers)
  const [currentUser , setCurentUser] = useState([])
  const [Erreurs , setErreurs] = useState([])
  const NomComplet = useRef()
  const Age = useRef()
  const Email = useRef()
  const Ville = useRef()
  const params = useParams()

  let validate = true  

  const getErreurs = ()=>{
    // -------- values champs : -------
    const valueNomComplet = NomComplet.current.value
    const valueAge = Age.current.value
    const valueEmail = Email.current.value
    const valueVille = Ville.current.value

    if(valueNomComplet.trim() === ""){
        setErreurs(prevState =>{
          return [...prevState , "NomComplete est obligatoire !!!"]
        } )
        validate = false
    }

    if(valueAge.trim() === ""){
      setErreurs(prevState =>{
        return [...prevState , "Age est obligatoire !!!"]
      } )
      validate = false
    }

    if(valueEmail.trim() === ""){
      setErreurs(prevState =>{
        return [...prevState , "Email est obligatoire !!!"]
      } )
      validate = false
    }else if(!valueEmail.match(/^\S+@\S+\.\S+$/)){
      setErreurs(prevState =>{
        return [...prevState , "Email est non valide !!!"]
      } )
      validate = false
    }

    if(valueVille.trim() === "vide"){
      setErreurs(prevState =>{
        return  [...prevState , "Ville est obigatoire !!!"]
      })
      validate = false
    }

  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setErreurs([])
    getErreurs()
    if(validate === false){
      return false
    }

    
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        // ---------- Traitemet transformer data ---------
        Context.actions.onUpdate({
          payload : {
             NomComplet : NomComplet.current.value,
             Age : Age.current.value , 
             Email : Email.current.value , 
             Ville : Ville.current.value , 
             id : parseInt(params.id)
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    // Swal.fire({
    //   position: "top-center",
    //   icon: "success",
    //   title: "Modifier avec success !!!",
    //   showConfirmButton: false,
    //   timer: 2000
    // });
    
    // alert('Modifier avec success !!! ');
  }

  useEffect(()=>{
      const {id} = params
      const user = Context.users.filter(userEdit => userEdit.id === parseInt(id))
      if(user.length > 0 ){
        setCurentUser(...user)
      }
      //  console.log(currentUser)
  } , [])
  
  return (
   
    <div className='d-flex w-100 vh-100 bg-dark text-light align-items-center justify-content-center'>
        <div className="bg-light w-50 rounded">
          <div className='bg-primary'>
            <h1 className="text-center text-light">Update User</h1>
          </div>
          <hr />
          {
             Erreurs.length > 0?
            <div className="alert alert-danger">
                <strong>Erreurs</strong>
                <ul>
                  {Erreurs.map((Erreur , keyErreur) => <li key={keyErreur}>{Erreur}</li>)}
                </ul>
            </div>
            :
            undefined
          }

          <form onSubmit={handleSubmit}>
          <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Id : </label>
                <h2 className='col-5 form-control w-50 fw-bold fs-4'>{currentUser.id}</h2>
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>NomComplete : </label>
                <input type="text" className='col-5 form-control w-50' placeholder='Enter votre nom ...' ref={NomComplet} defaultValue={currentUser.NomComplet}/>
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Age: </label>
                <input type="number" className='col-5 form-control w-50' placeholder='Enter votre Age ...' ref={Age} defaultValue={currentUser.Age} />
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Email : </label>
                <input type="text" className='col-5 form-control w-50' placeholder='Enter votre Email...' ref={Email} defaultValue={currentUser.Email}  />
             </div>
             <div className="row justify-content-center pb-5">
                <label className='col-3 text-primary fw-bold fs-4 me-5'>Ville : </label>
                <select type="text" className='col-5 form-control w-50' placeholder='Choisie votre Ville ' ref={Ville}   defaultValue={currentUser.Ville} key={currentUser.Ville}>
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
               <button className="btn btn-primary w-75  mb-4">Modifier</button>
             </div>

          </form>
        </div>
    </div>
  )
}

export default UserEdite
