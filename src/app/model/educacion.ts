export class Educacion {
    id: number;
    tituloEd: string;
    descripcionEd: string;
    fechaEd: number;
    imgEd: string;

    constructor(id: number, tituloEd: string, descripcionEd: string, fechaEd: number, imgEd: string) {
        this.id = id;
        this.tituloEd = tituloEd;
        this.descripcionEd = descripcionEd;
        this.fechaEd = fechaEd;
        this.imgEd = imgEd;
    }

}
