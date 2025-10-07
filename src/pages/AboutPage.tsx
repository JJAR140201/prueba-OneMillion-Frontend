import React from 'react';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  HeartIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { Card, CardContent } from '../components';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovación',
      description: 'Utilizamos tecnología de vanguardia para ofrecer la mejor experiencia en búsqueda de propiedades.',
    },
    {
      icon: UserGroupIcon,
      title: 'Transparencia',
      description: 'Creemos en procesos claros y transparentes en cada transacción inmobiliaria.',
    },
    {
      icon: HeartIcon,
      title: 'Compromiso',
      description: 'Nos comprometemos a encontrar el hogar perfecto para cada una de nuestras familias.',
    },
    {
      icon: TrophyIcon,
      title: 'Excelencia',
      description: 'Nos esforzamos por ofrecer el mejor servicio inmobiliario del mercado.',
    },
  ];

  const team = [
    {
      name: 'Alejandro Rodríguez',
      role: 'CEO & Fundador',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Visionario del sector inmobiliario con más de 15 años de experiencia.',
    },
    {
      name: 'Carmen Fernández',
      role: 'Directora de Operaciones',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
      bio: 'Experta en gestión inmobiliaria y procesos de compra-venta.',
    },
    {
      name: 'David Martín',
      role: 'Director Comercial',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Especialista en ventas inmobiliarias y relaciones con clientes.',
    },
    {
      name: 'Laura Sánchez',
      role: 'Jefe de Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Experta en marketing inmobiliario y estrategias digitales.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Nuestra Historia
          </h1>
          <p className="text-xl text-primary-100 leading-relaxed">
            Desde 2020, OneMillion Real Estate ha sido líder en el mercado inmobiliario, 
            ayudando a miles de familias a encontrar su hogar perfecto en todo el país.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
              Facilitar el proceso de compra, venta y alquiler de propiedades 
              a través de una plataforma confiable y transparente que conecte 
              a compradores, vendedores y propietarios de manera eficiente.
            </p>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Creemos que encontrar el hogar perfecto debe ser una experiencia 
              simple e intuitiva. Por eso ofrecemos herramientas avanzadas de 
              búsqueda y el respaldo de los mejores profesionales inmobiliarios.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-2">15K+</div>
                  <div className="text-secondary-600 text-sm">Propiedades Vendidas</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-2">98%</div>
                  <div className="text-secondary-600 text-sm">Satisfacción Cliente</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-2">25+</div>
                  <div className="text-secondary-600 text-sm">Ciudades Presentes</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-2">24/7</div>
                  <div className="text-secondary-600 text-sm">Asesoría Disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión y acción en nuestra empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary-100 rounded-xl">
                      <value.icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Conoce al Equipo
            </h2>
            <p className="text-xl text-secondary-600">
              Los profesionales inmobiliarios que hacen posible tu sueño de hogar.
            </p>
          </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nuestro Camino
            </h2>
            <p className="text-xl text-secondary-300">
              Los hitos más importantes en la historia de OneMillion Real Estate.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                2020
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Fundación</h3>
                <p className="text-secondary-300">
                  OneMillion Real Estate nace con la visión de transformar el mercado inmobiliario.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                2021
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Primera Expansión</h3>
                <p className="text-secondary-300">
                  Alcanzamos 1,000 propiedades vendidas y expandimos a 5 ciudades principales.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                2022
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Plataforma Digital</h3>
                <p className="text-secondary-300">
                  Lanzamos nuestra plataforma digital con búsqueda avanzada y tours virtuales.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                2023
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Líder del Mercado</h3>
                <p className="text-secondary-300">
                  Nos convertimos en la inmobiliaria #1 en satisfacción al cliente con 10,000+ ventas.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                2024
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2">Innovación Continua</h3>
                <p className="text-secondary-300">
                  Continuamos innovando con nuevas tecnologías para facilitar la compra de tu hogar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;