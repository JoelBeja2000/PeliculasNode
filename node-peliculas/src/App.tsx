import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { obtenerPeliculas, crearPelicula } from './entities/pelicula.service'
import { Pelicula } from './entities/pelicula/pelicula.model'
import { PeliculaComponent } from './entities/pelicula/pelicula.component'
import { Link, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";

import { LinkButton } from './LinkButton'
import { PeliculaUpdate } from './entities/pelicula/update/pelicula-update'
import { Home } from './home/Home'
import PeliculaDetail from './entities/pelicula/pelcula.detail'


function App() {


  return (     <>
  
   
      <div>
        <nav>
        <LinkButton ruta="/peliculas" texto="Películas" />
        <LinkButton ruta="/home" texto="Home" />
        <LinkButton ruta="/nuevaPelicula" texto="crear pelicula" />
        </nav>
        <Routes>
        <Route path="/peliculas" element={<PeliculaComponent/>}> </Route>
        <Route path="/peliculas/:id" element={<PeliculaDetail/>}> </Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/nuevaPelicula" element={<PeliculaUpdate/>} ></Route>
        </Routes>
        </div>
    
    </>
  )
}

export default App
