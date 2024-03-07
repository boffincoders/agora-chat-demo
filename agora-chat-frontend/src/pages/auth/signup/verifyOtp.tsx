import {
    Button,
    HStack,
    PinInput,
    PinInputField,
    useToast,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../../reduxThunk/slices/verifyOtp.slice";

const VerifyOtp = ({ email }: any) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [pin, setPin] = useState([
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
    ]);
    const { isLoading } = useSelector((state: any) => state.verifyOtp);
    const dispatch = useDispatch();
    const handleChangePin = (data: { value: string; index: number }) => {
        setPin(
            (prev) =>
            (prev = prev.map((pin, i) => {
                if (data.index === i) pin = { ...pin, value: data.value };
                return pin;
            }))
        );
    };
    const handleVerifyOtp = async (pin: string[]) => {
        let otp = "";
        pin.forEach((x) => (otp = otp + x));
        let response = await dispatch(verifyOtp({ email, otp }));
        response = response.payload;
        if (response.statusCode === HttpStatusCode.Ok) {
            toast({
                position: "top-left",

                title: "Verification Success",
                status: "success",
                isClosable: true,
            });
            navigate("/login");
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
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        Chatting
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verify Your Email
                            </h1>

                            <div className="flex justify-center">
                                <HStack>
                                    <PinInput size={"large"}>
                                        {pin.map((value, index) => (
                                            <PinInputField
                                                onChange={(e) =>
                                                    handleChangePin({ value: e.target.value, index })
                                                }
                                                height={10}
                                            />
                                        ))}
                                    </PinInput>
                                </HStack>
                            </div>

                            <Button
                                isLoading={isLoading}
                                onClick={() =>
                                    pin.filter((x) => x.value).length === 4 &&
                                    handleVerifyOtp(pin.map((x) => x.value))
                                }
                                disabled={pin.filter((x) => x.value).length !== 4}
                                colorScheme={
                                    pin.filter((x) => x.value).length === 4 ? "#176df5" : "gray"
                                }
                                variant="solid"
                                type="submit"
                                className="w-full bg-[#176df5]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                            >
                                Verify
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Didn't receieved OTP ?{" "}
                                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                                    Resend
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VerifyOtp;
