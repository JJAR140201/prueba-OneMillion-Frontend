import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { Button, Card, CardContent, CardHeader } from '../components';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Búsqueda Inteligente',
      description: 'Encuentra propiedades con nuestro sistema de filtros avanzados y búsqueda inteligente.',
    },
    {
      icon: CogIcon,
      title: 'Proceso Simplificado',
      description: 'Proceso de compra y alquiler simplificado con todas las herramientas necesarias.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Propiedades Verificadas',
      description: 'Todas nuestras propiedades están verificadas y cuentan con documentación completa.',
    },
  ];

  const testimonials = [
    {
      name: 'María García',
      role: 'Propietaria',
      content: 'Encontré mi casa perfecta en solo 2 semanas. El proceso fue increíblemente fácil y transparente.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    },
    {
      name: 'Carlos López',
      role: 'Inversor Inmobiliario',
      content: 'La mejor plataforma para encontrar oportunidades de inversión. Filtros precisos y propiedades verificadas.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    {
      name: 'Ana Martínez',
      role: 'Compradora Primera Vivienda',
      content: 'Me ayudaron en todo el proceso de compra. Atención personalizada y asesoramiento excepcional.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Encuentra tu
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Hogar Perfecto
                </span>
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Descubre las mejores propiedades inmobiliarias en España. 
                Desde apartamentos modernos hasta casas de ensueño, encontramos el hogar ideal para ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/properties">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary-600 hover:bg-primary-50"
                  >
                    Explorar Propiedades
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Ver Video
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="space-y-4">
                  <div className="h-4 bg-white bg-opacity-30 rounded"></div>
                  <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
                  <div className="h-32 bg-white bg-opacity-10 rounded-lg"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-16 bg-white bg-opacity-20 rounded"></div>
                    <div className="h-16 bg-white bg-opacity-20 rounded"></div>
                    <div className="h-16 bg-white bg-opacity-20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Características que Marcan la Diferencia
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Descubre las herramientas que te ayudarán a alcanzar tus objetivos 
            de manera más eficiente y efectiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" className="text-center hover:scale-105 transition-transform duration-300">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-100 rounded-xl">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">5K+</div>
              <div className="text-secondary-300">Propiedades</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">98%</div>
              <div className="text-secondary-300">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">150+</div>
              <div className="text-secondary-300">Ciudades</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-secondary-300">Atención Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-secondary-600">
            Testimonios reales de empresas que han transformado su negocio con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent>
                <p className="text-secondary-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-secondary-900">
                      {testimonial.name}
                    </div>
                    <div className="text-secondary-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            ¿Listo para Encontrar tu Hogar?
          </h2>
          <p className="text-xl text-secondary-600 mb-8">
            Únete a miles de personas que ya han encontrado su hogar ideal. 
            Comienza tu búsqueda hoy mismo, es completamente gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties">
              <Button size="lg">
                Buscar Propiedades
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contactar Asesor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;