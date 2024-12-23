import { Link } from "react-router-dom";


interface LinkButtonProps{
    ruta: string,
    texto?: string,


}


export function LinkButton({ruta, texto} : LinkButtonProps){

    return(
        <>
         <Link to = {ruta} ><button>{texto}</button></Link>
        
        </>
    )

}