import "./Navbar.css";

const Navbar = ({ navbarLinkData }) => {
  // console.log(navbarLinkData);
  const links = navbarLinkData.map((e, i) => (
    <li key={e+i}>
      <a href="#">{e}</a>
    </li>
  ));
  return (
    <nav className="Navbar">
      <ul>{links}</ul>
    </nav>
  );
};

export default Navbar;
