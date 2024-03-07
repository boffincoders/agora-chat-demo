import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { memo, useState } from "react";
import { IGetUsersData } from "../interfaces/user/getUser.reponse";
import UserInfo from "../pages/dashboard/chats/userInfo";

interface IChattingNavProps {
  user: IGetUsersData;
}
const ChattingNavbar = ({ user }: IChattingNavProps) => {
  const [userDetails, setUserDetails] = useState<boolean>(false);
  return (
    <>
      {" "}
      <div className="bg-[#1c99f2] p-2  px-6 ">
        <div className="flex justify-between items-center">
          {" "}
          <div className="flex items-center gap-3">
            <Avatar size={"sm"} src={user?.profilePic ? user.profilePic : ""} />
            <p className="text-white text-sm">{user.userName}</p>
          </div>
          <div
            onClick={() => setUserDetails(true)}
            className="text-white cursor-pointer"
          >
            <InfoOutlineIcon />
          </div>
        </div>
      </div>
      {userDetails && user && (
        <UserInfo isOpen={userDetails} setIsOpen={setUserDetails} user={user} />
      )}{" "}
    </>
  );
};

export default memo(ChattingNavbar);
