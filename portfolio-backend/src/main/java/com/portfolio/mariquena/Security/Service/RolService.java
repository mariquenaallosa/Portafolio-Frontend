
package com.portfolio.mariquena.Security.Service;

import com.portfolio.mariquena.Security.Entity.Rol;
import com.portfolio.mariquena.Security.Enums.RolNombre;
import com.portfolio.mariquena.Security.Repository.iRolRepository;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional 
public class RolService {
    @Autowired
    iRolRepository irolRepository;
    
    public Optional<Rol> getByRolNombre(RolNombre rolNombre){
    return irolRepository.findByRolNombre(rolNombre);
    }
    
    public void save(Rol rol){
       irolRepository.save(rol);
    } 
}
