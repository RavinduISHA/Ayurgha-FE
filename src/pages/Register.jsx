import { useState } from "react";
// import Avatar from "../assets/avatar-icon.png";
import RegImg from "../assets/register02.png";
import { Link, useNavigate } from "react-router-dom";
import uploadCloudinary from "../utils/uploadCloudinary";
import { ACTIVE_URL, ACTIVE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();
  // INPUT HANDLER
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // UPLOAD FILE HANLDER
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadCloudinary(file);

    setPreviewURL(URL.createObjectURL(file));
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  // VALIDATIONS
  const validationForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name field is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password field is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // SUBMIT HANDLER
  const submitHandler = async (event) => {
    event.preventDefault();

    if (validationForm()) {
      setLoading(true);

      try {
        const res = await fetch(`${ACTIVE_URL}/auth/register`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const { message } = await res.json();

        if (!res.ok) {
          throw new Error(message);
        }

        setLoading(false);
        toast.success(message);
        navigate("/login");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto border border-blue-400 rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* image */}
          <div className="hidden lg:block bg-primary rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={RegImg}
                alt=""
                className="w-[80%] h-[80%] rounded-l-lg mx-auto py-28"
              />
            </figure>
          </div>

          {/* form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-heading text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primary">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your Full name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[16px] leading-7 text-heading placeholder:text-textColor rounded-md cursor-pointer"
                />
                {errors.name && (
                  <span
                    style={{ color: "red", fontSize: "12px" }}
                    className="text-red-750 text-sm"
                  >
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[16px] leading-7 text-heading placeholder:text-textColor rounded-md cursor-pointer"
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[16px] leading-7 text-heading placeholder:text-textColor rounded-md cursor-pointer"
                />
                {errors.password && (
                  <span
                    style={{ color: "red", fontSize: "12px" }}
                    className="text-red-750 text-sm"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-heading font-bold text-[16px] leading-7"
                >
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-heading font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label
                  htmlFor=""
                  className="text-heading font-bold text-[16px] leading-7"
                >
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-heading font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primary flex items-center justify-center">
                  {previewURL ? (
                    <img
                      src={previewURL}
                      alt="Preview Image"
                      className="w-full rounded-full"
                    />
                  ) : (
                    ""
                  )}
                </figure>

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileInputChange}
                    id="customFile"
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-heading font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primary text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link to="/login" className="text-primary font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
