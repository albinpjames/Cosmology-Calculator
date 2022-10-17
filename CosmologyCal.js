const c = 299792.458; // Speed of light in Km/s
const T0 = 2.725; // Present temperature of CMB in K


const H0 = document.getElementById("H0");
const z = document.getElementById("z");
const OM = document.getElementById("OM");
const OR = document.getElementById("OR");
const OL = document.getElementById("OL");

let Hz;

class cosmology{
    constructor(H0, z, OM, OR, OL){
        this.H0 = H0;
        this.z = z;
        this.OM = OM;
        this.OR = OR;
        this.OL = OL;
    }

    E_z(z){
        return (this.OM*(1+z)**(3) + this.OR*(1+z)**(2) + this.OK*(1+z)**(2) + this.OL) 
    }

    // The value of the Hubble parameter at that redshift, H(z) [given by Eq. 74]
    HParam(){ 
        return (3)
    }

    // The present age of the universe, t_0 [given by Eq. 86], give this in Gyr or Myr
    t_0(){ 
        return (3)
    }

    // The age of the universe at that redshift, t(z) [given by Eq. 84], in Gyr or Myr
    t_z(){ 
        return (3)
    }

    // The look-back time up to that redshift, which is t_0 - t(z), in Gyr or Myr
    t_lb(){ 
        return (3)
    }

    // Co-moving distance to that redshift, r_c given by equation 99, in Mpc 
    r_c(){ 
        return (3)
    }
 
    // angular diameter distance to that redshift, given by eq. 100 in Mpc
    d_a(){ 
        return (3)
    }

    // luminosity distance to that redshift, given by eq. 111, in Mpc
    d_l(){ 
        return (3)
    }

    // Temperature of the universe at that redshift, T(z) = T_0 (1 + z), where T_0 is the present temperature of the CMB which is 2.725 K
    T_z(){ 
        return (T0*(1+this.z))
    }   

};



function calculate() {

    let obj = new cosmology(H0.value, z.value, OM.value, OR.value, OL.value);
   

    Hz = obj.HParam()
    t0 = obj.t_0()
    tz = obj.t_z()
    tlb = obj.t_lb()
    rc = obj.r_c()
    da = obj.d_a()
    dl = obj.d_l()
    Tz = obj.T_z()
    
    
    document.getElementById("Hz").innerHTML= Hz + ' - The Hubble Constant H at the redshift z.';
    document.getElementById("t0").innerHTML= t0 + ' - The Present age of the universe.';
    document.getElementById("tz").innerHTML= tz + ' - The universe age at z.';
    document.getElementById("tlb").innerHTML= tlb + ' - The Look Back Time at z.';
    document.getElementById("rc").innerHTML= rc + ' - The Co-Moving distance at z.';
    document.getElementById("da").innerHTML= da + ' - The diameter distance to z.';
    document.getElementById("dl").innerHTML= dl + ' - The Luminosity distance at z.';
    document.getElementById("Tz").innerHTML= Tz + ' - The Temperature of universe at z.';
}
