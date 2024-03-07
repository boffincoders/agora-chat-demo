import { ArrowLeftIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserClock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ILayoutProps } from ".";
import alarmIcon from "../../assets/images/alarm.svg";
import ConfirmModal from "../confirmModal";

const Header = (props: ILayoutProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;
  const location = useLocation();
  const [isAlertOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const loggedInUser =
    localStorage.getItem("loggedInUser") &&
    JSON.parse(localStorage.getItem("loggedInUser")!);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white shadow-2xl p-4 px-4 w-full flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div
          onClick={() =>
            navigate(
              location.pathname.includes("/chat/") ?
                '/chats' : "/"
            )
          }
          className=" cursor-pointer"
        >
          <ArrowLeftIcon className="text-[#D3D3D3] text-2xl" />
        </div>
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden cursor-pointer"
        >
          <HamburgerIcon className="text-[#D3D3D3] text-xl" />
        </div>
        <div className="w-full max-lg:hidden">
          <InputGroup>
            <Input
              size={"sm"}
              placeholder="Search here"
              className="!rounded-2xl md:!min-w-[40vh]  !max-w-[70vh] lg:!min-w-[60vh]"
            />
            <InputRightElement pointerEvents="none">
              <div>
                <SearchIcon className="text-[#D3D3D3] pr-4" />
              </div>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div onClick={() => navigate("/chatting/requests")} className="text-[#1c99f2] text-xl cursor-pointer">
          <FaUserClock />
        </div>
        <img src={alarmIcon} alt="alarm" height={20} width={20} />
        <div>
          <Menu>
            <MenuButton>
              <Avatar
                src={loggedInUser?.profilePic ? loggedInUser.profilePic : ""}
                size={"xs"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>{loggedInUser?.email}</MenuItem>
              <MenuItem
                onClick={() => {
                  setIsAlertModalOpen(true);
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <ConfirmModal
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertModalOpen}
          handleSubmit={handleLogout}
          submitButtonTitle="Logout"
          title="Do you want to logout?"
        />
      </div>
    </div>
  );
};

export default Header;
