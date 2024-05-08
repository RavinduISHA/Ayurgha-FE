/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { ACTIVE_URL, token } from "../../../config";
import Swal from "sweetalert2";

const Appointments = ({ appointments }) => {
  const handleDelete = async (bookingId) => {
    try {
      await fetch(`${ACTIVE_URL}/bookings/delete-booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully Deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStatus = async (bookingId) => {
    try {
      const response = await fetch(
        `${ACTIVE_URL}/bookings/${bookingId}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to change booking status");
      }
      toast.success("Successfully Cheked the Booking");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-grey-700 uppercase bg-grey-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-2 py-3">
            Price(LKR)
          </th>
          <th scope="col" className="px-6 py-3">
            Booked
          </th>
          <th scope="col" className="px-3 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex md:flex-col items-center px-2 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item.user.photo}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="pl-1">
                <div className="text-base font-semibold">{item.user.name}</div>
                {/* <div className="text-normal text-gray-500">
                  {item.user.email}
                </div> */}
              </div>
            </th>

            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  OnCash
                </div>
              ) : (
                <div className="flex items-center bg-red-500">Error</div>
              )}
            </td>
            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">
              {new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              {new Date(item.createdAt).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </td>
            <td
              className={`px-3 py-4 ${
                item.status === "pending"
                  ? "text-yellow-500"
                  : item.status === "approved"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.status === "pending"
                ? "Pending"
                : item.status === "approved"
                ? "Patient Checked"
                : "Cancelled"}
            </td>

            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleStatus(item._id);
                  }}
                  className="p-2 bg-green-600 rounded-md text-white"
                >
                  Check
                </button>
                <button
                  className="p-2 bg-red-600 rounded-md text-white"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You will not be able to recover this booking!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, delete it!",
                      cancelButtonText: "No, keep it",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(item._id);
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                          "Cancelled",
                          "Your booking is safe :)",
                          "error"
                        );
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
