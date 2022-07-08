
package com.portfolio.mariquena.Service;

import com.portfolio.mariquena.Entity.Persona;
import com.portfolio.mariquena.Repository.IPersonaRepository;
import com.portfolio.mariquena.dto.IPersonaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class ImpPersonaService implements IPersonaService{
    //Traigo repo
    @Autowired IPersonaRepository ipersonaRepository;
    
    
    
    
    @Override
    public List<Persona> getPersona() {
            List<Persona> persona = ipersonaRepository.findAll();
            return persona;
    }

    @Override
    public void savePersona(Persona persona) {
        ipersonaRepository.save (persona);
    }

    @Override
    public void deletePersona(Long id) {
        ipersonaRepository.deleteById (id);

    }

    @Override
    public Persona findPersona(Long id) {
        Persona persona = ipersonaRepository.findById(id).orElse(null);
        return persona;

    }
    
}
