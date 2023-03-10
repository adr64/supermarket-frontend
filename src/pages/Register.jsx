import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess && user) {
            navigate('/login')
            toast.info('Usuario registrado con éxito, por favor iniciar sesión')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Las contraseñas no coinciden')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner/>
    }

    return (
        <>
        <section className='heading'>
            <h1>
                <FaUser/> Registro
            </h1>
            <p>Por favor cree una cuenta</p>            
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id='name' name='name' 
                    value={name} onChange={onChange} placeholder='Ingrese su nombre' required/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' 
                    value={email} onChange={onChange} placeholder='Ingrese su correo electrónico' required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' 
                    value={password} onChange={onChange} placeholder='Ingrese su contraseña' required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password2' name='password2' 
                    value={password2} onChange={onChange} placeholder='Confirme su contraseña' required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Crear cuenta</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default Register