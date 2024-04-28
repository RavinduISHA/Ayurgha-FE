import DoctorCard from "./DoctorCard";
import { ACTIVE_URL } from "../../../config";
import Loader from "../../Loader/Loading";
import Error from "../../Error/Error";
import useFetchData from "../../hooks/useFetchData";

const DoctorList = () => {
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${ACTIVE_URL}/doctors`);
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
