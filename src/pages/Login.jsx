import React, { useState, useEffect } from 'react';
import { HeaderRegister, Footer } from '../components';
import { DotLottiePlayer, FadeIn, InputForm, Button, Container } from '../components/ui';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Use the custom login hook
  const { 
    isLoading, 
    error, 
    isAuthenticated, 
    login, 
    checkAuth 
  } = useLogin();
  
  // Check if user is already authenticated on component mount
  useEffect(() => {
    // Execute checkAuth only once when component mounts
    const isUserAuthenticated = checkAuth();
    if (isUserAuthenticated) {
      navigate('/dashboard');
    }
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use login method from hook
      const result = await login({
        username: formData.username,
        password: formData.password
      });
      
      if (result.success) {
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login submission error:', err);
      // Error is already handled in the useLogin hook
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderRegister />
      <main className="py-10 sm:py-16 md:py-20 mt-1 rounded-t-[3rem] px-4 sm:px-6 md:px-8">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left side - Animation and Text */}
            <FadeIn className="order-1 md:order-1" duration="1s">
              <div className="h-[200px] sm:h-[250px] md:h-[300px] mb-4 sm:mb-6">
                <DotLottiePlayer
                  src="/json/capitolio2.json"
                  autoplay={true}
                  loop={true}
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a602d] mb-3 sm:mb-4">¡Bienvenido!</h1>
                <p className="text-base sm:text-lg text-[#224a33]">
                  Inicia sesión para continuar con tus trámites.
                </p>
              </div>
            </FadeIn>

            {/* Right side - Form */}
            <FadeIn className="order-2 md:order-2" duration="1s">
              <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-[#e8f8ee] to-[#ffffff]">
                <InputForm
                  id="username"
                  name="username"
                  label="Usuario o correo"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese su usuario"
                  required={true}
                  disabled={isLoading}
                  className="shadow-md"
                />

                <InputForm
                  id="password"
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña"
                  required={true}
                  disabled={isLoading}
                  className="shadow-md"
                  showPasswordToggle={true}
                  onPasswordToggle={togglePasswordVisibility}
                  showPassword={showPassword}
                />

                {/* Show error message */}
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                <div className="mb-4 sm:mb-6 text-right">
                  <Link to="/forgot-password" className="text-[#1a602d] hover:text-[#157a3c] text-xs sm:text-sm">
                    ¿Olvidaste tu contraseña y/o usuario?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={true}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </div>
                  ) : (
                    'Iniciar sesión'
                  )}
                </Button>

                <div className="mt-4 sm:mt-6 text-center">
                  <span className="text-[#224a33] text-sm sm:text-base">¿No tienes cuenta aún? </span>
                  <Link to="/register" className="text-[#1a602d] hover:text-[#157a3c] font-medium text-sm sm:text-base">
                    Crear ahora
                  </Link>
                </div>
              </form>
            </FadeIn>
          </div>
        </Container>
      </main>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 135" fill="none">
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8f8ee" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path fill="url(#wave-gradient)" d="M1440 135V57.8C798.3 193.6 358.2-153.2 0 87.6V135h1440Z"></path>
      </svg>
      <Footer />
    </div>
  );
};

export default Login;
