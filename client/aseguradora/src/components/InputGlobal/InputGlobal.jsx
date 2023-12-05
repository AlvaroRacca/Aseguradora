import React from "react";
import "./InputGlobal.css";

const InputGlobal = (props) => {
  const { titulo, type = "text", required } = props;
  return (
      <div className="form__group field">
        <input
          className="form__field"
          placeholder={props.placeholder}
          required={required}
          type={type}
          value={props.value}
          onChange={props.onChange} // Configurar la función onChange para actualizar el estado
          name={props.name} // Asegúrate de proporcionar el atributo name
        />
        <label htmlFor="name" className="form__label">{titulo}</label>
      </div>
  );
};

export default InputGlobal;
