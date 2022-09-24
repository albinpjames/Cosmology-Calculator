c = 299792.458 # Speed of light in Km/s
T0 = 2.725 # Present temperature of CMB in K

class cosmology:
	
	def __init__ (self, params):
		self.H0 , self.z, self.OM, self.OR, self.OL = params
		self.OK = 1 -(self.OM+self.OR+self.OL)

	def E_z(self,z):
		return  (self.OM*(1+z)**(3) + self.OR*(1+z)**(2) + self.OK*(1+z)**(2) + self.OL) 

	# The value of the Hubble parameter at that redshift, H(z) [given by Eq. 74]
	def HParam(self): 
		self.Hz = self.H0 * self.E_z(self.z)**(1/2)

	#The present age of the universe, t_0 [given by Eq. 86], give this in Gyr or Myr
	def t_0(self): 
		integral = integrate.quad(lambda x: 1/((1+x)*self.E_z(x)**(1/2)), 0, np.inf)
		t0_sec = (1/self.H0)*3.08*10**(19) * integral[0]
		self.t0 = t0_sec/(31556952*10**(9))

	# The age of the universe at that redshift, t(z) [given by Eq. 84], in Gyr or Myr
	def t_z(self): 
		integral = integrate.quad(lambda x: 1/((1+x) * self.E_z(x)**(1/2)), self.z, np.inf)
		tz_sec = (1/self.H0)*3.08*10**(19) * integral[0]
		self.tz = tz_sec/(31556952*10**(9))

	# The look-back time up to that redshift, which is t_0 - t(z), in Gyr or Myr
	def t_lb(self): 
		self.tlb = self.t0 - self.tz

	# Co-moving distance to that redshift, r_c given by equation 99, in Mpc 
	def r_c(self): 
		integral = integrate.quad(lambda x: 1/(self.H0 * self.E_z(x)**(1/2)), 0, self.z)
		self.rc = c * integral[0]

	# angular diameter distance to that redshift, given by eq. 100 in Mpc
	def d_a(self):
		integral = integrate.quad(lambda x: 1/(self.H0 * self.E_z(x)**(1/2)), 0, self.z)
		self.da = (c/(1+self.z)) * integral[0]

	# luminosity distance to that redshift, given by eq. 111, in Mpc
	def d_l(self):
		self.dl = (1+self.z)**(2) * self.da

	# Temperature of the universe at that redshift, T(z) = T_0 (1 + z), where T_0 is the present temperature of the CMB which is 2.725 K
	def T_z(self):
		self.Tz = T0*(1+self.z)
