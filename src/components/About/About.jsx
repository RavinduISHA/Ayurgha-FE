import AboutImg from "../../assets/doctor-img02.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={AboutImg} alt="" />
            <div className="absolute z-20 botttom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src="" alt="" />
            </div>
          </div>
          {/* CONTENT */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="text-heading font-[800] text-[30px]">
              Pround to be one of the nationas best
            </h2>
            <p className="text_para">
              for 2+ yrs of ecprience Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Sint, deserunt quisquam! Nesciunt distinctio
              numquam, nisi omnis accusantium doloremque illo necessitatibus?
            </p>
            <p className="text_para mt-[30px]">
              for 2+ yrs of Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Voluptates, possimus.
            </p>

            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
