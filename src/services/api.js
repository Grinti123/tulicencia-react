import axios from 'axios';


const api = axios.create({
  baseURL: 'https://api.cescoonline.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);


// List Towns
const listTowns = {
  getTowns: async () => {
    const response = await api.get('/Pueblos');
    return response.data;
  },
}

// Register
const Register = {
  registerUser: async (userData) => {
    const requestData = {
      cl_pueblo: userData.pueblo,
      cl_id: userData.pueblo,
      pl_nombre: userData.pueblo,
      cl_nombre: userData.names,
      cl_segundoNombre: "",
      cl_primerApellido: userData.fatherSurname,
      cl_segundoApellido: userData.motherSurname,
      cl_zip: userData.postalCode,
      cl_direccion: "",
      cl_numeroLicencia: userData.licenseNumber,
      cl_numeroSeguro: userData.ssnLastFour,
      cl_numeroTelefono: userData.phoneNumber,
      cl_correo: userData.email,
      cl_genero: "",
      cl_talla: "",
      cl_peso: "",
      cl_tez: "",
      cl_colorPelo: "",
      cl_colorOjo: "",
      cl_fechaNacimiento: userData.dateOfBirth,
      cl_nombreUsuario: userData.username,
      cl_contrasena: userData.password,
      cl_puebloA: userData.pueblo
    };
    
    const response = await api.post('/Cliente', requestData);
    return response.data;
  },
}

// Export all API services
export const apiService = {
  listTowns,
  Register,
};