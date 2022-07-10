
package com.portfolio.mariquena.Interface;

import com.portfolio.mariquena.Entity.Persona;
import java.util.List;




public interface IPersonaService {
    //Traer una persona
    public List<Persona> getPersona();
  
    //guardar un obj de tipo persona
    public void savePersona (Persona persona);
    
    //Eliminar persona
    public void deletePersona(Long id);
    
    //Buscar una persona por ID
    public Persona findPersona(Long id);
}
