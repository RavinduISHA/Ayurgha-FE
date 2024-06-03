import { useEffect, useRef, useContext } from "react";
// import UserImg from "../../assets/userimage.png";
import Logo from "../../assets/MediIcon.png";
import UserImage from "../../assets/userimage.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickHeader = () => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (window.scrollY > 80) {
          headerRef.current.classList.add("sticky__header");
        } else {
          headerRef.current.classList.remove("sticky__header");
        }
      }
    });
  };

  useEffect(() => {
    handleStickHeader();

    return () => window.removeEventListener("scroll", handleStickHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center fixed z-20">
      <div className="container">
        <div className="flex items-center justify-between">
          {/*LOGO */}
          <div>
            <img src={Logo} alt="Logo" />
          </div>

          {/*MENU */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primary text-[16px] leading-7 font-[600]"
                        : "text-text text-[16px] leading-7 font-[500] hover:text-primary"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* NAV RIGHT */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  } `}
                >
                  <figure className="w-[35px] h-[35px] rounded-full">
                    {user.photo ? (
                      <img src={user.photo} className="w-full round" alt="" />
                    ) : (
                      <img
                        src={UserImage}
                        className="w-full round"
                        alt="Dummy"
                      />
                    )}
                  </figure>

                  {/* <h2>{user?.name}</h2> */}
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[30px] transition-all hover:text-primary hover:bg-white">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
