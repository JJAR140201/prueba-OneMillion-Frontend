import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  UserCircleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../common';
import { cn } from '../../utils';

export interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showMenuButton = false,
  user,
}) => {
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/properties' },
    { name: 'Acerca de', href: '/about' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Admin', href: '/admin/properties' },
  ];

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" />
              </Button>
            )}
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🏠</span>
              </div>
              <span className="text-xl font-bold text-secondary-900 hidden sm:block">
                OneMillion Real Estate
              </span>
            </Link>
          </div>

          {/* Center navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  location.pathname === item.href
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User menu */}
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-secondary-400" />
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-secondary-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-secondary-500">{user.email}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;