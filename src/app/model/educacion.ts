export class Educacion {
    id?: number;
    tituloEd: string;
    descripcionEd: string;

    constructor(tituloEd: string, descripcionEd: string){
        this.tituloEd = tituloEd;
        this.descripcionEd = descripcionEd;
    }
}