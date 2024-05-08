/* eslint-disable react/prop-types */
// import formateDate from "../../utils/";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div className="mt-12">
      <div>
        <h3 className="text-[20px] leading-[30px] text-heading font-semibold flex items-center gap-2">
          About of
          <span className="text-iris font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">{about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-heading font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => {
            const startDate = new Date(item.startingDate);
            const endDate = new Date(item.endingDate);
            const startFormattedDate = startDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const endFormattedDate = endDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-iris text-[15px] leading-6 font-semibold">
                    {`${startFormattedDate} - ${endFormattedDate} `}
                  </span>
                  <p className="text-[16px] leading-5 font-medium text-textColor">
                    {item.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {item.university}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="">
        <h3 className="text-[20px] leading-[30px] text-heading font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => {
            const startDate = new Date(item.startingDate);
            const endDate = new Date(item.endingDate);
            const startFormattedDate = startDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const endFormattedDate = endDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <li key={index} className="p-4 rounded bg-[#fff9ea]">
                <span className="text-blue-600 text-[15px] leading-6 font-semibold">
                  {`${startFormattedDate} - ${endFormattedDate} `}
                </span>
                <p className="text-[16px] leading-5 font-medium text-textColor">
                  {item.position}
                </p>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {item.hospital}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
