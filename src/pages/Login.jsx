import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACTIVE_URL, ACTIVE_URL } from "../../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [errors, setErrors] = useState({});

  // INPUT HANLDER
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // VALIDATIONS
  const validationForm = () => {
    let errors = {};

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
        const res = await fetch(`${ACTIVE_URL}/auth/login`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });

        console.log(result, "Login Data");

        setLoading(false);
        toast.success(result.message);
        navigate("/home");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primary">Welcome </span>Back 🎉
        </h3>

        <form action="" className="px-5 lg:px-0" onSubmit={submitHandler}>
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

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primary text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
