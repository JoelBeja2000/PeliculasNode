export interface IPageable{
    page:number;
    size:number;
    sort:string;

    }
    
    export class Pageable implements IPageable{
    
        constructor(
         public page:number,
         public size:number,
         public sort:string,
        
        ){}

    
    }


    export interface IPageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface IPage {
    content: [];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

  