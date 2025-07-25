import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "../assets/login-logo.png";
import { useUser } from "../context/userUser";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is Required"),
});

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSignIn = async (values: FormValues) => {
    console.log(values);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential) {
        console.log("user signed in successfully", userCredential);
        toast.success("Logged in successfully !");
          auth.onAuthStateChanged((user) => {
            if (user) {
              setUser({
                email: user.email || "",
                name: user.displayName || "",
              });
              localStorage.setItem(
                "user",
                JSON.stringify({
                  email: user.email || "",
                  name: user.displayName || "",
                })
              );
            }
          });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: values.email,
            name: userCredential.user.displayName || "",
          })
        );
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message === "Firebase: Error (auth/too-many-requests)."
            ? "Too many requests, try again later"
            : "Invalid email or password"
        );
      } else {
        toast.error("Something went wrong, please try again later.");
      }
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
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {() => (
            <Form>
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
                Sign in
              </button>

              <p className="text-xs mt-4">
                By continuing, you agree to Amazon's Fake Clone Conditions of
                Use and Privacy Notice.
              </p>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="border border-gray-500 rounded w-full h-[30px] mt-3 text-sm cursor-pointer"
              >
                Create your Amazon Account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
