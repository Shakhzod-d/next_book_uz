import DashboardIcon from "@/assets/icons/DashboardIcon";
import Basket from "../images/Basket";
import Settings from "../images/Settings";

export const Menus = [
  {
    image: <DashboardIcon className="fill" />,
    name: "PROFILE.DASHBOARD",
    value: "dashboard",
  },
  {
    image: <Basket className="stroke" />,
    name: "PROFILE.MY_ORDERS",
    value: "orders",
  },
  {
    image: <Settings className="stroke" />,
    name: "PROFILE.PROFILE_SETTINGS",
    value: "settings",
  },
];
