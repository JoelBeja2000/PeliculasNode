import { useEffect, useState } from "react";
import { obtenerPeliculas, crearPelicula } from "../pelicula.service";
import { IPelicula } from "./pelicula.model";

export const PeliculaComponent = () => {
  const [peliculas, setPeliculas] = useState<IPelicula[]>([]); // Estado para la lista de películas
  const [formData, setFormData] = useState<IPelicula>({
    nombre: "",
    descripcion: "",
    fechaLanzamiento: undefined, // Inicializado como indefinido para ser compatible con `Date`
  });

  useEffect(() => {
    const fetchPeliculas = async () => {
      const data = await obtenerPeliculas();
      setPeliculas(data);
    };
    fetchPeliculas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Para fecha, almacenamos el valor temporalmente como string
    if (name === "fechaLanzamiento") {
      setFormData({ ...formData, [name]: new Date(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nuevaPelicula = await crearPelicula(formData);
      setPeliculas([...peliculas, nuevaPelicula]); // Actualiza la lista con la nueva película
      setFormData({ nombre: "", descripcion: "", fechaLanzamiento: undefined }); // Limpia el formulario
    } catch (error) {
      console.error("Error al crear la película:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Crear nueva película</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              name="descsripcion"
              value={formData.descripcion || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Fecha de lanzamiento:</label>
            <input
              type="date"
              name="fechaLanzamiento"
              value={formData.fechaLanzamiento?.toISOString().split("T")[0] || ""}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Crear Película</button>
        </form>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Lanzamiento</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.map((pelicula, index) => (
              <tr key={index}>
                <td>{pelicula.nombre}</td>
                <td>{pelicula.descripcion}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
