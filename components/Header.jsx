import '../assets/styles/components/Header.scss';

export default (props) => (
  <header className="Header wrap wrap--wide">
    <div className="Header__group Header__group--left">
      <a href="/">
        {/* <Logo className="Header__logo"/> */}
      </a>
      <a href="/" className="Header__title">
        <h1>Flipnote Player</h1>
        <h2 className="Header__subtitle">Version {process.env.VERSION}</h2>
      </a>
    </div>
    <div className="Header__group Header__group--right">
      {/* <Icon icon={ props.darkMode ? "darkmodeOn" : "darkmodeOff" } onClick={ e => this.toggleDarkmode() }/> */}
    </div>
  </header>
);