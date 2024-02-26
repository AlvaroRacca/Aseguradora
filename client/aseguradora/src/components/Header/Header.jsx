import "./Header.css";

function Header() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Glacial+Indifference:wght@400;700&display=swap"
      />
      <header className="header">
        <p id="p-nombre">Turri, Jose Ignacio - Racca, Álvaro</p>
        <h1 className="header__title">PoliGestion</h1>
        <p id="p-nombre">Practicas Profesionalizantes II 2023</p>
      </header>
    </div>
  );
}

export default Header;
