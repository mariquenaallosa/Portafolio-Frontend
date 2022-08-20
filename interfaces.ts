
export interface Experiencia {
    id: number;
    tituloExp: string;
    empleador: string;
    fechaIngreso: number;
    fechaFinal: number;
    descripcionE:String;
}

export interface Educacion {
    id: number;
    tituloEd: string;
    institucion: string;
    fechaIngreso: number;
    fechaFinal: number;
    descripcionEd:String
    imgUrl: string;
}

export interface Skills{
    id:number;
    skillsLevel:number;
    nombreSkill: string;
    imgSkill: string
}

export interface Proyecto {
    id: number;
    titulo:string;
    descripcion:string;
    imgUrl:string;
    repoUrl:string;
    demoUrl: string;
}
