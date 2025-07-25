import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  //   signInWithEmailAndPassword,
  createUserWithEmailAndPassword,updateProfile
} from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../assets/login-logo.png";
import toast from "react-hot-toast";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is Required"),
  name: Yup.string()
    .required("Full Name Is Required")
    .min(6, "Must be at least 6 characters"),
});

const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      if (userCredential){
        toast.success('user registered successfully!, you can now login');
         navigate("/login")
      };
    } catch(error: unknown) {
      if(error instanceof Error){
        toast.error(
          error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "Email already in use, try another one"
            : error.message
        );
      }
        else{
          toast.error("Something went wrong, please try again later.");
        };
      }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          className="w-[100px] my-6 object-contain mx-auto"
        />
      </Link>

      <div className="w-[300px] border border-gray-300 rounded-md p-5">
        <h1 className="text-xl font-medium mb-5">Sign in</h1>

        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {() => (
            <Form>
              <div className="mb-2">
                <label className="block mb-1 text-sm">Full Name</label>
                <Field
                  type="name"
                  name="name"
                  className="w-full border border-gray-300 p-2 text-sm rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-sm">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 p-2 text-sm rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 text-sm">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 p-2 text-sm rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-[#cd9042] text-[#111] w-full h-[30px] mt-3 border border-[#a88734] rounded cursor-pointer text-sm"
              >
                Sign up
              </button>

              <p className="text-xs mt-4">
                By continuing, you agree to Amazon's Fake Clone Conditions of
                Use and Privacy Notice.
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="border border-gray-500 rounded w-full h-[30px] mt-3 text-sm cursor-pointer"
              >
                Already Have an Amazon Account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
