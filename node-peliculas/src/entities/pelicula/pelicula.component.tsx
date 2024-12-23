import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { obtenerPeliculas, crearPelicula, buscarPeliculas } from "../pelicula.service";
import { IPelicula, Pelicula } from "./pelicula.model";
import { Pageable, IPageResponse } from "../pageable/pageable.model";
import { Link } from "react-router-dom";

export const PeliculaComponent = () => {

  const [nombreBusqueda, setNombreBusqueda] = useState<string>("")
  const [data, setData] = useState<IPageResponse<Pelicula>>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
  });
  

  const [pageable, setPageable] = useState<Pageable>({
    page: 0,
    size: 2,
    sort:"id,asc"
  })
  const [pelicula, setPelicula] = useState<Pelicula[]>([])


  useEffect(() =>{

    const llamarPeliculas = async() => {
       setData(await obtenerPeliculas(pageable))
      
       


      setPelicula(data.content)
      
      
    }
    llamarPeliculas();
  },[pelicula, pageable]);

  const handleSubmit = async (e:React.FormEvent) =>{
    e.preventDefault()

    const resultado = async() => {
    const busqueda = await buscarPeliculas(nombreBusqueda)
    setPelicula(busqueda)
  }
    resultado();
   }
 
 const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  setNombreBusqueda(e.target.value)
 }


 const handlePage = (tipo: string) =>{
  
  setPageable({
    ...pageable, 
    page: 
    tipo === 'nextPage'
    ? Math.min(pageable.page + 1, data.totalPages)
    : tipo === 'prevPage'
    ? Math.max(pageable.page -1,0)
    : pageable.page
    
    });
   
  

   

    
 }

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <label>
        <input
        name="buscador"
        value={nombreBusqueda}
        onChange={handleChange}
        />
      </label>
    <button type="submit">Buscar</button>
    </form>

    <form>
    <button type="button" onClick={()=>handlePage('nextPage')}>Siguiente</button>
    <span>{pageable.page}</span>
    <button type="button" onClick={()=>handlePage('prevPage')}>Atras</button>
    <span>total de paginas {data?.totalPages}</span>
    </form>

    <div>
      <table>
      <thead>
      <tr>
        <th>id</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>FechaLanzamiento</th>
        </tr>
      </thead>  
      <tbody>
        {pelicula.map((item,index) =>(
          <tr key={index}>
            <Link to={`/peliculas/${item.id}`}>{item.id}</Link>
            <td>{item.nombre}</td>
            <td>{item.descripcion}</td>
            <td>{item.fechaLanzamiento?.toString()}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>

    </>
  );
};
