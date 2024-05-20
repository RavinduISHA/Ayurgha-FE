import { Link } from "react-router-dom";
// import logo from "../../assets/logofoo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com/",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
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

const quickLinks02 = [
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/doctors",
    display: "Request an Appointment",
  },
  {
    path: "/home",
    display: "Find a Location",
  },
  {
    path: "/contact",
    display: "Get a Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/home",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-warp gap-[30px]">
          <div className="text-center md:text-start">
            {/* <img src={logo} alt="" className="w-48 h-20" /> */}
            <p className="font-bold text-black text-xl">Ayurgha</p>
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright &#169; {year} developed by{" "}
              <a
                href="https://ravindu-ishan.vercel.app/"
                className="underline font-bold"
              >
                Ravindu Umayanga
              </a>
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1F] rounded-full flex items-center justify-center group hover:bg-primary hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              I want to:{" "}
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
