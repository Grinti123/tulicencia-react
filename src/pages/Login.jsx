import React, { useState } from 'react';
import HeaderRegister from '../components/HeaderRegister';
import { DotLottiePlayer, FadeIn } from '../components/ui';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add login logic here
  };

  return (
    <div className="min-h-screen">
      <HeaderRegister />
      <main className="py-20 mt-1 rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Animation and Text */}
          <FadeIn className="order-2 md:order-1" duration="1s">
            <div className="h-[300px] mb-6">
              <DotLottiePlayer
                src="/json/capitolio2.json"
                autoplay={true}
                loop={true}
              />
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold text-[#1a602d] mb-4">¡Bienvenido!</h1>
              <p className="text-lg text-[#224a33]">
                Inicia sesión para continuar con tus trámites.
              </p>
            </div>
          </FadeIn>

          {/* Right side - Form */}
          <FadeIn className="order-1 md:order-2" duration="1s">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg bg-gradient-to-b from-[#e8f8ee] to-[#ffffff]">
              <div className="mb-6">
                <label htmlFor="username" className="block text-[#1a602d] font-medium mb-2">
                  Usuario o correo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese su usuario"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-[#1a602d] font-medium mb-2">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6 text-right">
                <Link to="/forgot-password" className="text-[#1a602d] hover:text-[#157a3c] text-sm">
                  ¿Olvidaste tu contraseña y/o usuario?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a602d] text-white py-3 px-4 rounded-lg hover:bg-[#157a3c] transition duration-200"
              >
                Iniciar sesión
              </button>

              <div className="mt-6 text-center">
                <span className="text-[#224a33]">¿No tienes cuenta aún? </span>
                <Link to="/register" className="text-[#1a602d] hover:text-[#157a3c] font-medium">
                  Crear ahora
                </Link>
              </div>
            </form>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
