import "./Footer.css"

const Footer = (props) => {
    // console.log(props);
  return (
    <footer className="Footer">
        <div>
            {props.children}
        </div>
      <small>&copy; Diksy 2022</small>
    </footer>
  );
};

export default Footer;
