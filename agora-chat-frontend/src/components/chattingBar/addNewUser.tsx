import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import chatServices from "../../services";
interface IAddNewUserModal {
  isAddNewUser: boolean;
  setIsAddNewUser: (data: boolean) => any;
}
const AddNewUser = ({ isAddNewUser, setIsAddNewUser }: IAddNewUserModal) => {
  const [userName, setUserName] = useState<string>("");
  const [addUserLoading, setAddUserLoading] = useState<boolean>(false);
  const toast = useToast();
  const handleAddUser = async (name: string) => {
    setAddUserLoading(true);
    if (userName) {
      let response = await chatServices.addUser(name);
      if (response.statusCode === HttpStatusCode.Ok) {
        toast({
          position: "top-left",
          title: "Request Sent To User",
          status: "success",
          isClosable: true,
        });
        setIsAddNewUser(false);
      } else
        toast({
          position: "top-left",
          title: response.data.message,
          status: "error",
          isClosable: true,
        });

      setAddUserLoading(false);
    }
  };
  return (
    <div>
      <Modal isOpen={isAddNewUser} onClose={() => setIsAddNewUser(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-sm mb-1">Registered Username/Email </p>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setIsAddNewUser(false)}>
              Close
            </Button>
            <Button
              isLoading={addUserLoading}
              onClick={() => userName && handleAddUser(userName)}
              isDisabled={!userName}
              colorScheme="blue"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewUser;
