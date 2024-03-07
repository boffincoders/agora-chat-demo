import { Button, useToast } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect } from "react";
import logo from "../../assets/images/logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../../reduxThunk/slices/getLoggedInUser.slice";
import { login } from "../../reduxThunk/slices/login.slice";
import chatServices from "../../services";
import { loginSchema } from "../../utils/validationSchema/login.validation.schema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.login);
  const toast = useToast();
  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) navigate("/");
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-2">
        <motion.div
          animate={{ rotate: "360deg", y: [0, 150 - 150, -150, 0] }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Chatting
        </motion.div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Formik
            validationSchema={loginSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              let response = await dispatch(login(values));
              response = response.payload;
              if (response.statusCode === HttpStatusCode.Ok) {
                // eslint-disable-next-line no-lone-blocks
                {
                  localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(response.data)
                  );
                  dispatch(setLoggedInUser(response.data));
                  toast({
                    position: "top-left",
                    title: "Login Success",
                    status: "success",
                    isClosable: true,
                  });
                  if (response?.data?.agoraBearerToken)
                    await chatServices.createAgoraUser({
                      token: response?.data?.agoraBearerToken,
                      password: "1234",
                      username: response.data.chatId,
                    });
                  if (response?.last_login) navigate("/");
                  else navigate("/update-profile");
                }
              } else
                toast({
                  position: "top-left",

                  title: response.message,
                  status: "error",
                  isClosable: true,
                });
            }}
          >
            {({ errors, touched, setFieldValue, handleSubmit }) => (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account{" "}
                </h1>
                <Form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    <span className="text-xs text-[red]">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <span className="text-xs text-[red]">
                    {errors.password && touched.password && errors.password}
                  </span>
                  <Button
                    isLoading={isLoading}
                    colorScheme="#176df5"
                    variant="solid"
                    type="submit"
                    className="w-full bg-[#176df5]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  >
                    Sign In
                  </Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account ?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                    >
                      Sign Up
                    </span>
                  </p>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
