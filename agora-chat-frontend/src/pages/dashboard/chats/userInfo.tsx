import {
    Avatar,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { IGetUsersData } from "../../../interfaces/user/getUser.reponse";
interface IUserInfoProps {
    user: IGetUsersData;
    isOpen: boolean;
    setIsOpen: (value: boolean) => any;
}

const UserInfo = (props: IUserInfoProps) => {
    const { user, isOpen, setIsOpen } = props;
    return (
        <div>
            <Modal size={"full"} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex justify-center items-center">
                            <Avatar
                                size={"2xl"}
                                src={user?.profilePic ? user.profilePic : ""}
                            />
                        </div>
                        <p className="text-center mt-2 ">{user.chatId}</p>
                        <p className="text-center mt-2 ">{user.email}</p>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UserInfo;
