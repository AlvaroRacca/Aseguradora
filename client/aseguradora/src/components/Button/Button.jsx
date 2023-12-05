import "./Button.css";
function Button(props) {
    const { titulo, onClick, disabled } = props;
  return (
    <div className="App">
        <button className="button" onClick={onClick} disabled={disabled}>
            {titulo}
        <div className="arrow">›</div>
      </button>
    </div>
  );
}

export default Button;