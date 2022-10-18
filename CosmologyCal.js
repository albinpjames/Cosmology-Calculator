const c = 299792.458; // Speed of light in Km/s
const T0 = 2.725; // Present temperature of CMB in K


const H0 = document.getElementById("H0");
const z = document.getElementById("z");
const OM = document.getElementById("OM");
const OR = document.getElementById("OR");
const OL = document.getElementById("OL");

// let H0v =69.6;
// let zv =  3.0;
// let OMv = 0.286;
// let ORv =  0.00;
// let OLv = 0.714;
// let OKv = 1 -(OMv + ORv + OLv)


function simpsons_(ll, ul, n, func){
 
    // Calculating the value of h
    let h = (ul - ll) / n;

    // Array for storing value of x
    // and f(x)
    let x = [];
    let fx= [];

    // Calculating values of x and f(x)
    for (let i = 0; i <= n; i++) {
        x[i] = ll + i * h;
        fx[i] = func(x[i]);
    }

    // Calculating result
    let res = 0;
    for (let i = 0; i <= n; i++) {
        if (i == 0 || i == n)
            res += fx[i];
        else if (i % 2 != 0)
            res += 4 * fx[i];
        else
            res += 2 * fx[i];
    }
       
    res = res * (h / 3);
    return res;
    }


class cosmology{
    constructor(H0, z, OM, OR, OL){
        this.H0 = Number(H0);
        this.z = Number(z);
        this.OM = Number(OM);
        this.OR = Number(OR);
        this.OL = Number(OL);
        this.OK = 1 -(this.OM + this.OR + this.OL)
    }


    E_z(z){
        return (this.OM*(1+z)**(3) + this.OR*(1+z)**(2) + this.OK*(1+z)**(2) + this.OL) 
    }

    // The value of the Hubble parameter at that redshift, H(z) [given by Eq. 74]
    HParam(){ 
        return (this.H0 * this.E_z(this.z)**(1/2))
    }

    // The present age of the universe, t_0 [given by Eq. 86], give this in Gyr or Myr
    fun_t_0(x){ 
        return (1/((1+x)*(this.E_z(x))**(1/2)));
        
    }

    t_0(){ 
        let integ = (simpsons_(0, 1000000, 10000000, this.fun_t_0.bind(this)))
        return ((1/this.H0)*3.08*10**(19) * integ)/(31556952*10**(9))
    }


    // The age of the universe at that redshift, t(z) [given by Eq. 84], in Gyr or Myr
    fun_t_z(x){
       return (1/((1+x) * this.E_z(x)**(1/2)));

    }

    t_z(){ 
        let integ = (simpsons_(this.z, 1000000, 10000000, this.fun_t_z.bind(this)))
        return ((1/this.H0)*3.08*10**(19) *integ)/(31556952*10**(9))
    }

    // The look-back time up to that redshift, which is t_0 - t(z), in Gyr or Myr
    t_lb(t0, tz){ 
        return (t0-tz)
    }

    // Co-moving distance to that redshift, r_c given by equation 99, in Mpc 
    fun_r_c(x){
       return 1/(this.H0 * this.E_z(x)**(1/2))
    }


    r_c(){ 
        let integ = (simpsons_(0, this.z, 100, this.fun_r_c.bind(this)))
        return (c * integ)
    }
 
    // angular diameter distance to that redshift, given by eq. 100 in Mpc
    fun_d_a(x){
        return 1/(this.H0 * this.E_z(x)**(1/2))
    }

    d_a(){ 
        let integ = (simpsons_(0, this.z, 100, this.fun_r_c.bind(this)))
        return ((c/(1+this.z)) * integ)
    }

    // luminosity distance to that redshift, given by eq. 111, in Mpc
    d_l(da){ 
        return ((1+this.z)**(2) * da)
    }

    // Temperature of the universe at that redshift, T(z) = T_0 (1 + z), where T_0 is the present temperature of the CMB which is 2.725 K
    T_z(){ 
        return (T0*(1+this.z))
    }   

};



function calculate() {

    let obj = new cosmology(H0.value, z.value, OM.value, OR.value, OL.value);
    // let obj = new cosmology(69.6, 3.0, 0.286, 0.00, 0.714);

    Hz = obj.HParam()
    t0 = obj.t_0()
    tz = obj.t_z()
    tlb = obj.t_lb(t0,tz)
    rc = obj.r_c()
    da = obj.d_a()
    dl = obj.d_l(da)
    Tz = obj.T_z()
    
    
    document.getElementById("Hz").innerHTML= Hz + ' (km/s / pMpc) - The Hubble Constant H at the redshift z.';
    document.getElementById("t0").innerHTML= t0 + ' (Gyr) - The Present age of the universe.';
    document.getElementById("tz").innerHTML= tz + ' (Gyr) - The universe age at z.';
    document.getElementById("tlb").innerHTML= tlb + ' (Gyr) - The Look Back Time at z.';
    document.getElementById("rc").innerHTML= rc + ' (Mpc) - The Co-Moving distance at z.';
    document.getElementById("da").innerHTML= da + ' (Mpc) - The diameter distance to z.';
    document.getElementById("dl").innerHTML= dl + ' (Mpc) - The Luminosity distance at z.';
    document.getElementById("Tz").innerHTML= Tz + ' (K) - The Temperature of universe at z.';
}
