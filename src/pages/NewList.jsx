
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createList, reset } from "../features/lists/listSlice"
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"

function NewList() {

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.lists)

  const [name,] = useState(user.name)
  const [listName, setListName]= useState('')
  const [details, setDetails]= useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      dispatch(reset())
      navigate('/')
      toast.info('Lista creada exitosamente')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createList({listName, details}))

  }
  
  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
    <BackButton url='/'/>
    <section className='heading'>
      <h1>Crear nueva lista</h1>
      <p>Complete la información</p>
    </section>
    <section className="form">
      <div className="form-group">
        <label htmlFor="name">Creador</label>
        <input type="text" className="form-control" value={name} disabled/>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="listName">Nombre</label>
          <input type="text" name="listName" id="listName" value={listName}  placeholder="Ingrese el nombre de la lista" onChange={(e) => setListName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="details">Detalles</label>
          <textarea name="details" id="details" className="form-control" 
          placeholder="Ingrese los detalles" value={details} rows="15" onChange={(e) => setDetails(e.target.value)}>
          </textarea>
          <div className="form-group">
            <button className="btn btn-block">Crear</button>
          </div>
        </div>
      </form>
    </section>
    </>
  )
}

export default NewList