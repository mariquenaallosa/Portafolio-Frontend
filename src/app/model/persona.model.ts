export class persona{
    id?: number;
    nombre: string;
    apellido: string;
    titulo: string;
    about: string;
    linkedinUrl: string;
    githubUrl: string;
    email: string;
    img: string;

    constructor(nombre: string, apellido: string, img: string, titulo: string , about: string,
        linkedinUrl: string,
        githubUrl: string,
        email: string){

        this.nombre = nombre;
        this.apellido = apellido;
        this.titulo= titulo;
        this.about=about;
        this.linkedinUrl=linkedinUrl;
        this.githubUrl=githubUrl;
        this.email= email;
        this.img = img;
    }
}