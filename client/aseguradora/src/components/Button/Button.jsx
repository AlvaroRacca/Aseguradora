import "./Button.css";
import { Card } from 'flowbite-react';
function Button(props) {
    const { titulo, onClick, disabled } = props;
  return (
   
    <Card
      onClick={onClick} disabled={disabled}
      className="card max-w-sm"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {titulo}
      </h5>
      
    </Card>
  );
}

export default Button;