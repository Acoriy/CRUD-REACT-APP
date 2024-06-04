import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ContextUsers } from './UserApp'
import Swal from 'sweetalert2'

const UserDelete = () => {
    const Context = useContext(ContextUsers)
    const params = useParams()

    // console.log(parseInt(params.id))

    const handleDelete = (e)=>{
        e.preventDefault();

        // ----------- Message alert : ---------
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
          
        }).then((result) => {
          if (result.isConfirmed) {
            // -------- Traitemet transformer data : ----------
            Context.actions.onDeleteUser({
              payload : {
                id : params.id
              }
            })
            //-------------------------------------------------A  
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
        
    }
   
    
  return (
    <div className='bg-dark w-100 vh-100 d-flex justify-content-center align-items-center'>
        <div className='bg-light w-75 rounded p-5 ' align={'center'}>
            <h1 className='text-danger'>Tu es sure de suprimer se user ???</h1>
            <div className='alert alert-danger'>
                <strong>Danger : </strong>
                l'orsque le user est suprimer tu na pas le droit de le retourner  !!!
            </div>
            <button className="btn btn-danger w-75" onClick={handleDelete}>Suprimer</button>
        </div>
    </div>
    
  )
}

export default UserDelete
