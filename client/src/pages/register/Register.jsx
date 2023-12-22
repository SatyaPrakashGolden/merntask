import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import './register.css';

const Register = () => {
  // Destructure values and functions from AuthContext
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    // Update the corresponding field in formData on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Call the register function from the context
      await register(formData);
      // Navigate to the home page after successful registration
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      // Handle the error state or show a message to the user
    }
  };

  const { username, email, password } = formData;

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register!</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your details to register.
                  </p>
                  <form onSubmit={handleRegister}>
                    {/* Form inputs */}
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="typeUsername"
                        name="username"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="typeUsername">
                        Username
                      </label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        name="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>
                    {/* Submit button */}
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                  {/* Social media links */}
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg" />
                    </a>
                  </div>
                </div>
                {/* Sign in link */}
                <div>
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
