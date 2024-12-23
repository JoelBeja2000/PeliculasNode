import { IPelicula } from "./pelicula/pelicula.model";
import { IPageable, Pageable, IPageResponse, IPage } from "./pageable/pageable.model";


const apiUrl : string = 'http://localhost:8080/api/peliculas';


export const obtenerPeliculas = async(pageable: IPageable) : Promise<IPageResponse<IPelicula>> => {

    const response = await fetch(`${apiUrl}?page=${pageable.page}&size=${pageable.size}`, {
        method : 'GET',
        headers: {'Content-Type' : 'application/json'},
    })

    if(!response.ok){
        throw new Error('Error al buscar las peliculas')
    }

   // ignora esto const listaDePeliculas :IPageResponse<IPelicula> = await response.json()
    return await response.json()

}


export const buscarPeliculas = async(name: string) : Promise<IPelicula[]> => {

    const response = await fetch(`${apiUrl}/buscar?name=${name}`, {
        method : 'GET',
        headers: {'Content-Type' : 'application/json'},
    })

    if(!response.ok){
        throw new Error('Error al buscar la pelicula')
    }

    let listaDePeliculas :IPelicula[] = await response.json()
    return listaDePeliculas

}

export const buscarByIdPeliculas = async(id: string) : Promise<IPelicula> => {

    const response = await fetch(`${apiUrl}/${id}`, {
        method : 'GET',
        headers: {'Content-Type' : 'application/json'},
    })

    if(!response.ok){
        throw new Error('Error al buscar la pelicula')
    }

    let pelicula :IPelicula = await response.json()
    return pelicula

}

export const crearPelicula = async(pelicula: IPelicula): Promise<IPelicula> => {

    const response = await fetch(apiUrl,{
    method: 'POST',
    headers: {"Content-Type" : "application/JSON"},
    body: JSON.stringify(pelicula)
    })

    if(!response.ok){
        throw new Error("Error")
    }

    const nuevaPelicula : IPelicula =  await response.json()
     return nuevaPelicula;

    
}

export const borrarPelicula = async(id:number) : Promise<void> => {

    const response = await fetch(apiUrl + '/{id}', {
        method : 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(id)
    })

    if(!response.ok){
        throw new Error('Error al borrar la pelicula')
    }

}