import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ILayoutProps } from ".";
import { IRoutesConfig, routesConfig } from "../../routes";
interface IRoutes extends IRoutesConfig {
  isSelected: boolean;
}
const Sidebar = (props: ILayoutProps) => {
  const { setIsSidebarOpen } = props;
  const router = useNavigate();
  const [sidebarRoutes, setSidebarRoutes] = useState<IRoutes[]>(
    routesConfig.map((route) => {
      return { ...route, isSelected: false };
    })
  );
  const location = useLocation();
  useEffect(() => {
    setSidebarRoutes((prev) => {
      let index: any = null;
      let routeKey = "";
      prev = prev.map((x) => {
        if (x.key.includes("/:")) routeKey = x.key.split(":")[0];
        if (x.key === location.pathname) {
          if (!x.parentKey) {
            x = { ...x, isSelected: true };
          } else index = prev.findIndex((route) => route.key === x.parentKey);
        } else if (
          x.key.includes("/:") &&
          location.pathname.includes(routeKey)
        ) {
          index = prev.findIndex((route) => route.key === x.parentKey);
        } else x = { ...x, isSelected: false };
        return x;
      });
      if (index) prev[index] = { ...prev[index], isSelected: true };

      return [...prev];
    });
  }, [location.pathname]);
  return (
    <div className="maincolor h-screen">
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="flex justify-between p-2 px-3 lg:hidden text-white cursor-pointer"
      >
        <div></div>
        <div>
          <CloseIcon />
        </div>
      </div>
      <p className="text-white text-center lg:pt-3">Logo here</p>

      <div className="grid grid-cols-12 mt-6 text-white">
        {sidebarRoutes.map(
          (route) =>
            !route.isHidden && (
              <>
                <div
                  className={`col-span-2 ${location.pathname === route.key || route.isSelected
                      ? "bg-white text-[#584ACD] py-1 "
                      : ""
                    } mt-3`}
                ></div>
                <div
                  onClick={() => router(route.key)}
                  className={`col-span-8 ${location.pathname === route.key || route.isSelected
                      ? "bg-white text-[#584ACD] py-2 text-lg rounded-r-xl"
                      : "cursor-pointer  "
                    } mt-3`}
                >
                  <div className="flex gap-4">
                    <div>{route.icon}</div>

                    <div>{route.title}</div>
                  </div>
                </div>
                <div className="col-span-2"></div>
              </>
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
