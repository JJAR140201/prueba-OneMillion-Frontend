import React, { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent } from '../components';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsLoading(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Teléfono',
      details: ['+34 91 123 45 67', '+34 93 765 43 21'],
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['contacto@onemillionrealestate.com', 'ventas@onemillionrealestate.com'],
    },
    {
      icon: MapPinIcon,
      title: 'Oficinas',
      details: ['Madrid, España', 'Barcelona, España', 'Valencia, España'],
    },
    {
      icon: ClockIcon,
      title: 'Horario',
      details: ['Lun - Dom: 9:00 - 21:00', 'Asesoría 24/7 Online'],
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-primary-100 leading-relaxed">
            ¿Buscas tu hogar ideal? Nuestros asesores inmobiliarios están listos para ayudarte. 
            Contáctanos y encuentra la propiedad perfecta para ti y tu familia.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Encuentra tu Hogar Ideal
            </h2>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                    <Input
                      label="Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Teléfono"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                    />
                    <Input
                      label="Tipo de Propiedad *"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Casa, Apartamento, Local, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Cuéntanos más sobre tu consulta..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                    <info.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-secondary-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <Card padding="none">
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-secondary-400 mx-auto mb-2" />
                    <p className="text-secondary-600">Mapa Interactivo</p>
                    <p className="text-secondary-500 text-sm">
                      Encuentra nuestras oficinas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-secondary-600">
              Encuentra respuestas rápidas a las preguntas más comunes.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  ¿Cuánto tiempo tardan en responder?
                </h3>
                <p className="text-secondary-600">
                  Normalmente respondemos en menos de 24 horas durante días laborables. 
                  Para consultas urgentes, puedes contactarnos por teléfono.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  ¿Ofrecen soporte técnico 24/7?
                </h3>
                <p className="text-secondary-600">
                  Sí, ofrecemos soporte técnico 24/7 para clientes con planes Premium y Enterprise. 
                  Los clientes con planes básicos tienen soporte durante horario comercial.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  ¿Pueden ayudarme con la implementación?
                </h3>
                <p className="text-secondary-600">
                  Por supuesto. Nuestro equipo de especialistas puede ayudarte con la 
                  implementación, migración de datos y capacitación de tu equipo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;