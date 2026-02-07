import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div 
      className={`bg-brand-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/30 ${className}`}
      style={{ width: size, height: size }}
    >
      <Shield size={size * 0.6} strokeWidth={2.5} />
    </div>
  );
};

export default Logo;