import {
  Calendar,
  ChartBarStacked,
  Home,
  Landmark,
  Settings,
  Wallet,
} from "lucide-react";

// Menu items.
const configNav = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Chi tiêu",
    url: "/spend",
    icon: Wallet,
  },
  {
    title: "Danh mục",
    url: "/category",
    icon: ChartBarStacked,
  },
  {
    title: "Tháng hiện tại",
    url: "/my-month",
    icon: Calendar,
  },
  {
    title: "Ngân hàng",
    url: "#",
    icon: Landmark,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default configNav;
