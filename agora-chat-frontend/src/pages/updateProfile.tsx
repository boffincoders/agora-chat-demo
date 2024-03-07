import { Avatar, Box, Button, Card, useToast } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { updateProfile } from "../reduxThunk/slices/updateProfile.slice";

const UpdateProfile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading } = useSelector((select: any) => select.signup);
  const [profilePic, setProfilePic] = useState<string>(loggedInUser.profilePic);
  const [profilePicObj, setProfilePicObj] = useState<FileList>();
  const [userName, setUserName] = useState(loggedInUser.userName);
  const fileInputRef = useRef<any>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
      setProfilePicObj(e.target.files);
    }
  };
  const handleUpdateProfile = async () => {
    const data = new FormData();
    data.append("userName", userName);
    if (profilePicObj) data.append("profilePic", profilePicObj[0]);
    let response = await dispatch(updateProfile(data));
    response = response.payload;
    if (response.statusCode === HttpStatusCode.Ok) {
      // eslint-disable-next-line no-lone-blocks
      {
        toast({
          position: "top-left",

          title: "Profile Updated",
          status: "success",
          isClosable: true,
        });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...loggedInUser, ...response.data })
        );

        navigate("/");
      }
    } else
      toast({
        position: "top-left",

        title: response.message,
        status: "error",
        isClosable: true,
      });
  };
  // useEffect(() => {
  //     if (location.pathname === "/update-profile" && loggedInUser.last_login)
  //         navigate("/");
  // }, []);
  return (
    <div>
      {!loggedInUser ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center min-h-screen max-lg:p-2">
          <Card className="p-4 w-full md:w-[80%] lg:w-[75%]  2xl:w-[50%] md:px-10">
            <h2 className="text-[#176df5] text-xl font-semibold">
              Update Profile
            </h2>
            <div className="md:flex justify-around items-center ">
              <div className="mt-10 w-full max-lg:flex justify-center">
                <Box>
                  <Avatar
                    className="cursor-pointer"
                    onClick={(e) => {
                      fileInputRef.current && fileInputRef.current.click();
                    }}
                    size="2xl"
                    src={profilePic}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                  />
                </Box>
              </div>
              <div className="w-full">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    name="name"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mt-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    value={loggedInUser.email}
                    name="password"
                    disabled
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-10 max-md:justify-center md:justify-between">
              <div></div>
              <div className="flex gap-2 ">
                <Button
                  isLoading={isLoading}
                  onClick={() => handleUpdateProfile()}
                  variant={"solid"}
                  colorScheme="#176df5"
                  className="bg-[#176df5]"
                >
                  Save
                </Button>
                <Button onClick={() => navigate("/")}>Skip</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
