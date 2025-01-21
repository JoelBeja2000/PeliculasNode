export interface IPelicula {
id?: number;

nombre?: string;

descripcion?: string;

fechaLanzamiento?: Date ;

portada?: string;

}

export class Pelicula implements IPelicula{
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public fechaLanzamiento?: Date,
        public portada?: string,
    ){}
}