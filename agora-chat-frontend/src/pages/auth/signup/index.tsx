import { useState } from "react";
import SignupMain from "./mainSignup";
import VerifyOtp from "./verifyOtp";

const Singup = () => {
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    return (
        <div>
            {!isOtpSent ? (
                <SignupMain setEmail={setEmail} setIsOtpSent={setIsOtpSent} />
            ) : (
                isOtpSent && email && <VerifyOtp email={email} />
            )}
        </div>
    );
};

export default Singup;
