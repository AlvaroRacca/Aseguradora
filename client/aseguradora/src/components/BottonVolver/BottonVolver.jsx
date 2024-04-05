import "./ButtonVolver.css";

export function ButtonVolver({ onClick }) {
  

  return (
    <div className="App">
      <img
      onClick={onClick}
              src="/asset/siguiente.png"
              alt="Asegurar"
              style={{
                transform: "rotate(180deg)",
                marginTop:"30px",
                width: "50px",
                height: "50px",
                display: "block",
                margin: "auto",
                cursor:"pointer"
              }}
            />
    </div>
  );
};

export function ButtonFinalizar({ onClick }) {
  
  return (
    <div className="App">
      <img
      onClick={onClick}
              src="asset/terminado.png"
              alt="Asegurar"
              style={{
                marginTop:"30px",
                width: "50px",
                height: "50px",
                display: "block",
                margin: "auto",
                cursor:"pointer"
              }}
            />
    </div>
  );
};
