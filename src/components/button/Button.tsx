import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ text, icon,className, ...props }) => {
  return <button className={className} {...props}> {{icon} && ""}{text}</button>;
}

export default React.memo(Button);
