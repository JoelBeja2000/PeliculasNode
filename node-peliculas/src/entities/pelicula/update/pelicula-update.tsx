import { useState } from "react"
import { Pelicula } from "../pelicula.model"
import { crearPelicula } from "../../pelicula.service"

export function PeliculaUpdate() {

    const[formData, setFormData] = useState<Pelicula>({
        nombre: "",
        descripcion: "", 
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
       if (name === "fechaLanzamiento") {
      setFormData({ ...formData, [name]: new Date(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault
            const nuevaPelicula = await crearPelicula(formData);
            setFormData({nombre: "", descripcion: "", fechaLanzamiento: undefined})


    }


    return(<>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
        <label> 
            Nombre:  
            <input
            type="text"
            name="nombre"
            value={formData?.nombre || ""}
            onChange={handleChange}
            required
            />
           
        </label>
        </div>
        <div>
        <label> 
            Descripción: 
            <input
            type="text"
             name="descripcion"
            value={formData?.descripcion || ""}
            onChange={handleChange}
            required
            />
        </label>
        </div>

        <div>
        <label> 
            Fecha Lanzamiento: 
            <input
            type="date"
             name="fechaLanzamiento"
            value={formData?.fechaLanzamiento?.toISOString().split('T')[0] || "" }
            onChange={handleChange}
            required
            />
        </label>
        </div>
        <button type="submit"> Crear Pelicula</button>

        </form>

        </div>
    
    
    </>)
   
}