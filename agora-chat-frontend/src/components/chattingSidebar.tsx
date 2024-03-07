import { Avatar, Button, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegFaceGrinWink } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { IGetUsersData } from "../interfaces/user/getUser.reponse";
import AddNewUser from "./chattingBar/addNewUser";

const ChattingSidebar = ({
  usersList,
  setIsOpenChatBar,
  openChatBar,
}: {
  usersList: IGetUsersData[];
  setIsOpenChatBar: (data: boolean) => any;
  openChatBar: boolean;
}) => {
  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <div className="bg-[black] h-screen relative">
        <div className="flex justify-between p-2 px-3 lg:hidden text-white cursor-pointer">
          <div></div>
          <div></div>
        </div>
        <div className="">
          <div className="max-lg:flex justify-between">
            <p></p>
            <p className="text-white text-center lg:pt-3 mb-6 max-lg:mt-2">
              Contacts
            </p>
            <div
              onClick={() => setIsOpenChatBar(!openChatBar)}
              className="text-white cursor-pointer lg:hidden"
            >
              <CloseButton />
            </div>
          </div>
          {usersList.length === 0 && (
            <>
              <p className="text-center text-white flex items-center gap-3 justify-center text-lg mt-20">
                <span>No Contacts Yet</span> <FaRegFaceGrinWink />
              </p>
              <div className="flex justify-center">
                <Button onClick={() => setIsAddNewUser(true)} className="mt-4">
                  Add Contact
                </Button>{" "}
              </div>
            </>
          )}{" "}
        </div>
        {usersList.map((x, i) => (
          <div key={i} className="px-3">
            <div className={`${x._id === id ? "bg-white rounded-xl " : ""}`}>
              <div
                onClick={() => navigate(`/chat/${x._id}`)}
                className={`flex items-center gap-3 py-2 text-white  cursor-pointer ml-4 `}
              >
                <Avatar size={"sm"} />
                <div
                  className={`${id === x._id ? "text-black font-bold" : "text-white "
                    }`}
                >
                  {x.userName}
                </div>
              </div>
            </div>
          </div>
        ))}
        {usersList.length !== 0 && (
          <div
            onClick={() => setIsAddNewUser(true)}
            className="absolute bottom-5 left-[25%] right-[50%]"
          >
            <Button className="">Add User</Button>
          </div>
        )}
      </div>
      {isAddNewUser && (
        <AddNewUser
          isAddNewUser={isAddNewUser}
          setIsAddNewUser={setIsAddNewUser}
        />
      )}
    </div>
  );
};

export default ChattingSidebar;
