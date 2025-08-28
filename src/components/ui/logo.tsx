import { Bot } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "h-8 w-auto" }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="p-2 bg-gradient-primary rounded-lg">
        <Bot className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
        IA Agent
      </span>
    </div>
  );
};

export default Logo;