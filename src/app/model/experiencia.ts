export class Experiencia {
    id? : number;
    tituloExp: string;
    empleador: string;
    fechaIngreso: number;
    fechaFinal: number;
    descripcionE:String;

    constructor(tituloExp:string, empleador: string, fechaIngreso: number,fechaFinal: number, descripcionE:String) {
        this.tituloExp = tituloExp;
        this.empleador = empleador;
        this.fechaIngreso = fechaIngreso;
        this.fechaFinal = fechaFinal;
        this.descripcionE = descripcionE;
    }

}
