import "./Button.css";
function Button(props) {
    const { titulo, onClick } = props;
  return (
    <div className="App">
        <button className="button" onClick={onClick}>
            {titulo}
        <div className="arrow">›</div>
      </button>
    </div>
  );
}

export default Button;