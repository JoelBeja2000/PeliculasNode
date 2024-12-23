import { Route, Routes } from "react-router-dom";
import { PeliculaComponent } from "./entities/pelicula/pelicula.component";
import { Home } from "./home/Home";
import { PeliculaUpdate } from "./entities/pelicula/update/pelicula-update";
 


interface RutasProps {
  path: string;
}

const routeToComponent: Record<string, JSX.Element> = {
  "/peliculas": <PeliculaComponent />,
  "/home": <Home />,
  "/nuevaPelicula" : <PeliculaUpdate/>
};

const verificarRutas = ({ path }: RutasProps): JSX.Element | null => {
  return routeToComponent[path] || null;
};

export function Rutas({ path }: RutasProps) {
  const element = verificarRutas({ path });

  if (!element) {
    return <h1>Ruta no encontrada</h1>;
  }

  return (
    <Routes>
      <Route path={path} /><PeliculaUpdate/> </Routes>
  );
}
