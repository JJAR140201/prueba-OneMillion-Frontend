import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { HomePage, AboutPage, ContactPage, PropertiesPage } from './pages';

function App() {
  // Datos de usuario simulados (en una app real vendrían de un contexto o estado global)
  const user = {
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  };

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          {/* Rutas adicionales se pueden agregar aquí */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">404</h1>
                <p className="text-secondary-600 mb-8">Página no encontrada</p>
                <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
