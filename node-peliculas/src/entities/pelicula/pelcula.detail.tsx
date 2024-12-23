import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarByIdPeliculas } from "../pelicula.service";
import { Pelicula } from "./pelicula.model";

const PeliculaDetail = () => {
  // Obtener el ID de la película desde los parámetros de la URL
  const  {id}  = useParams();

  // Estado para almacenar la película obtenida
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);

  useEffect(() => {
    const fetchPelicula = async () => {
      if (id) {
        try {
          const data = await buscarByIdPeliculas(id);
          setPelicula(data);
        } catch (error) {
          console.error("Error al obtener la película:", error);
        }
      }
    };

    fetchPelicula();
  }, [id]); 

 
  if (!pelicula) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{pelicula.nombre}</h1>
      <p>{pelicula.descripcion}</p>
      <p>Fecha de lanzamiento: {pelicula.fechaLanzamiento?.toString()}</p>

    </div>
  );
};

export default PeliculaDetail;
