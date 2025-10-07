import React from 'react';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  user,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      {showHeader && <Header user={user} />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;