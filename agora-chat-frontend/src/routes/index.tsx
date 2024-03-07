import { ChatIcon, SunIcon } from "@chakra-ui/icons";

export interface IRoutesConfig {
    title: string;
    icon: any;
    path: string;
    key: string;
    isHidden: boolean;
    parentKey?: string;
    isNonLayouted?: boolean;
}
export const routesConfig: IRoutesConfig[] = [
    {
        icon: <SunIcon />,
        title: "Dashboard",
        isHidden: false,
        key: "/",
        path: "./pages/dashboard/home",
    },
    {
        icon: <ChatIcon />,
        title: "Chats",
        isHidden: false,
        key: "/chats",
        path: "./pages/dashboard/chats",
    }, {
        icon: <ChatIcon />,
        title: "",
        key: "/chat/:id",
        parentKey: "/chats",
        isHidden: true,
        path: "./pages/dashboard/chats/chatWithUser",
    }
];
