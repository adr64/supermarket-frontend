import { Link } from "react-router-dom"
import { FaRegListAlt , FaEye } from 'react-icons/fa';

function Home() {
    return (
        <>
            <section className="heading">
                <h1>¿Qué desea hacer?</h1>
                <p>Seleccione una opción:</p>
            </section>

            <Link to='/new-list' className='btn btn-reverse btn-custom'>
                <FaRegListAlt /> Crear una nueva lista
            </Link>

            <Link to='/tickets' className='btn btn-block'>
                <FaEye/> Ver las listas
            </Link>
        </>
    )
}

export default Home