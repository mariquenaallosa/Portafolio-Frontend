export class Persona {
        id?: number;
        nombre: string;
        apellido: string;
        titulo: string;
        about: string;
        photoUrl: string

        constructor(nombre: string,apellido: string,titulo: string,about: string,photoUrl: string) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.titulo = titulo;
            this.about = about;
            this.photoUrl = photoUrl
        }

}
