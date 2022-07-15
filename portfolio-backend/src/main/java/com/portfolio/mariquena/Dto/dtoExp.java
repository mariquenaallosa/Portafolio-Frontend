
package com.portfolio.mariquena.Dto;

import javax.validation.constraints.NotBlank;


public class dtoExp {
  @NotBlank  
  private String nombreE;
  @NotBlank
    private String descripcionE;


//Constructor 

    public dtoExp() {
    }

    public dtoExp(String nombreE, String descripcionE) {
        this.nombreE = nombreE;
        this.descripcionE = descripcionE;
    }

    
    //GYS

    public String getNombreE() {
        return nombreE;
    }

    public void setNombreE(String nombreE) {
        this.nombreE = nombreE;
    }

    public String getDescripcionE() {
        return descripcionE;
    }

    public void setDescripcionE(String descripcionE) {
        this.descripcionE = descripcionE;
    }
    
    
}
