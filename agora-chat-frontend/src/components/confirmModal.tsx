import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
interface IAppAlertProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => any;
  title: string;
  heading?: string;
  handleSubmit: () => any;
  submitButtonTitle: string;
}
const ConfirmModal = ({
  isOpen,
  setIsOpen,
  title,
  heading,
  submitButtonTitle,
  handleSubmit,
}: IAppAlertProps) => {
  const cancelRef: any = React.useRef();

  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {heading && (
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {heading}
              </AlertDialogHeader>
            )}

            <AlertDialogBody><p className="pt-4">{title}</p></AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={()=>setIsOpen(false)} className="!bg-[red] !text-white" ref={cancelRef}>Cancel</Button>
              <Button onClick={() => handleSubmit()} ml={3}>
                {submitButtonTitle ?? "Ok"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default ConfirmModal;
