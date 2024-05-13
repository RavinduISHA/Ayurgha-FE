import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const validationForm = () => {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject field is required";
    }
    if (!formData.message.trim()) {
      errors.message = "Message field is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validationForm();
  };
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md md:mt-16">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 md:mb-16 lg:mb-16 font-light text-center text_para">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form
          action=""
          method="post"
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="example@gmail.com"
              className="form_input mt-1"
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              placeholder="Let us know how we can help you"
              className="form_input mt-1"
            />
            {errors.subject && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.subject}
              </span>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              rows="6"
              type="text"
              name="message"
              id="message"
              value={formData.message}
              placeholder="Leave a Comment... "
              className="form_input mt-1"
            />
            {errors.message && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.message}
              </span>
            )}
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
