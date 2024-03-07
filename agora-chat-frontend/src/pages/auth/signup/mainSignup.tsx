import { Button, useToast } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { Form, Formik } from "formik";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ISignupData } from "../../../interfaces/auth/signup";
import { signup } from "../../../reduxThunk/slices/signup.slice";
import { SignupSchema } from "../../../utils/validationSchema/signup.validationSchema";
const SignupMain = (props: {
    setIsOtpSent: (value: boolean) => any;
    setEmail: (value: string) => any;
}) => {
    const { setIsOtpSent, setEmail } = props;
    const navigate = useNavigate();
    const toast = useToast();
    const { isLoading } = useSelector((state: any) => state.signup);
    const dispatch = useDispatch();
    const handleSignup = async (data: ISignupData) => {
        let response = await dispatch(signup(data));
        response = response.payload;
        if (response.statusCode === HttpStatusCode.Ok) {
            {
                setEmail(data.email);
                toast({
                    position: "top-left",
                    title: `An OTP is sent to ${data.email}`,
                    status: "info",
                    isClosable: true,
                });
                setIsOtpSent(true);
            }
        } else
            toast({
                position: "top-left",
                title: response.message,
                status: "error",
                isClosable: true,
            });
    };
    return (
        <div>
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen ">
                    < motion.div
                        animate={{ rotate: "360deg", y: [0, 150 - 150, -150, 0] }}
                        transition={{ duration: 1, ease: "backInOut" }} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        Chatting
                    </motion.div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <Formik
                            validationSchema={SignupSchema}
                            initialValues={{ email: "", password: "", confirmPassword: "" }}
                            onSubmit={(values) => {
                                handleSignup(values);
                            }}
                        >
                            {({
                                errors,
                                touched,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Sign up to your account
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

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Confirm Password
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setFieldValue("confirmPassword", e.target.value)
                                                }
                                                type="password"
                                                name="confirmPassword"
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <span className="text-xs text-[red]">
                                                {" "}
                                                {errors.confirmPassword &&
                                                    touched.confirmPassword &&
                                                    errors.confirmPassword}
                                            </span>
                                        </div>
                                        {/* <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="remember"
                                                        aria-describedby="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label className="text-gray-500 dark:text-gray-300">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Forgot password?
                                            </p>
                                        </div> */}
                                        <Button
                                            isLoading={isLoading}
                                            colorScheme="#176df5"
                                            variant="solid"
                                            type="submit"
                                            className="w-full bg-[#176df5]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                                        >
                                            Sign up
                                        </Button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account ?{" "}
                                            <span
                                                onClick={() => navigate("/login")}
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                                            >
                                                Sign In
                                            </span>
                                        </p>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignupMain;
