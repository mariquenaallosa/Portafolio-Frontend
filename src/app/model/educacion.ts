export class Educacion {
    id?: number;
    tituloEd: string;
    institucion: string;
    fechaIngreso: number;
    fechaFinal: number;
    descripcionEd: string;

    constructor(tituloEd: string, institucion: string,fechaIngreso: number,fechaFinal: number, descripcionEd: string){
        this.tituloEd = tituloEd;
        this.institucion = institucion;
        this.fechaIngreso = fechaIngreso;
        this.fechaFinal = fechaFinal;
        this.descripcionEd = descripcionEd;
    }
}