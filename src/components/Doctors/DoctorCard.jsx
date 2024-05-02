/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import starIcon from "../../assets/Star.png";
import { BiSolidArrowToRight } from "react-icons/bi";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const DoctorCard = ({ doctor }) => {
  const {
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = doctor;

  const location = useLocation();

  const isProfileMeRoute = location.pathname === "/users/profile/me";

  const handleStatus = async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Cancel");
      }
      toast.success("Successfully Cancelled");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="p-3 lg:p-5">
        <div>
          <img src={photo} alt="" className="w-full" />
        </div>
        <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-heading font-[700] mt-3 lg:mt-5">
          {name}
        </h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
          <span className="bg-[#CCF0F3] text-iris py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
            {specialization}
          </span>
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-heading">
              <img src={starIcon} alt="" className="" />
              {averageRating}
            </span>
            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-text">
              ({totalRating})
            </span>
          </div>
        </div>
        <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
          <div>
            {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-heading">+{totalPatients} patients</h3> */}
            <p className="text-[14px] leading-6 font-[400] text-text">
              {" "}
              At {experiences && experiences[0]?.hospital}
            </p>
          </div>
          <Link
            to={`/doctors/${doctor._id}`}
            className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primary hover:bg-none"
          >
            <BiSolidArrowToRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
        {isProfileMeRoute && (
          <div>
            {doctor.appointments.map((bookingId) => (
              <button
                key={bookingId}
                onClick={(e) => {
                  e.preventDefault();
                  handleStatus(bookingId);
                }}
                className="p-2 bg-red-600 rounded-md text-white flex justify-center w-full md:mt-2"
              >
                Cancel Booking
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorCard;
