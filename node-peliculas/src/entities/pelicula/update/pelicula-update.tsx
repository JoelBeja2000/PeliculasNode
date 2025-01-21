import { useState } from "react";
import { Pelicula } from "../pelicula.model";
import { crearPelicula } from "../../pelicula.service";

export function PeliculaUpdate() {
  const [formData, setFormData] = useState<Pelicula>({
    nombre: "",
    descripcion: "",
    fechaLanzamiento: undefined, // Asegúrate de que sea opcional en la interfaz
    portada: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fechaLanzamiento") {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, portada: selectedFile.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    try {
      await crearPelicula(formData, file);
      alert("Película creada exitosamente.");
      setFormData({
        nombre: "",
        descripcion: "",
        fechaLanzamiento: undefined,
        portada: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error al crear la película:", error);
      alert("Ocurrió un error al crear la película.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
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
              value={formData.descripcion}
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
              value={
                formData.fechaLanzamiento
                  ? formData.fechaLanzamiento.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              
            />
          </label>
        </div>
        <div>
          <label>
            Subir Imagen:
            <input type="file" name="imagen" onChange={handleFile} accept="image/*" />
          </label>
        </div>
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
}
