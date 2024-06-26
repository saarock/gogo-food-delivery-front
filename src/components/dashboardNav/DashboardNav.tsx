import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlineBarChart } from "react-icons/ai";
import "./dashboardNav.css";
import { dashBoardNavProps } from "../../types";
import { toast } from "react-toastify";

const navItems = [
  { to: "dash/success-orders", label: "Success Orders", icon: AiOutlineBarChart },
  { to: "dash/removed-orders", label: "Removed Orders", icon: AiOutlineDelete },
  { to: "#reports-orders", label: "Reports", icon: AiOutlineBarChart },
  { to: "#res-orders", label: "My Orders", icon: AiOutlineBarChart },
  { to: "#assign-orders", label: "Assign Orders", icon: AiOutlineBarChart },
  {
    to: "booking/receive-orders",
    label: "Receive Orders",
    icon: AiOutlineBarChart,
  },
];

const DashboardNav: React.FC<dashBoardNavProps> = () => {
  const commingSoonMessage = () => {
    toast.success("Service is comming soon");
  };
  return (
    <div className="dashboard-nav">
      <div className="dashboard-logo">Admin Dashboard</div>
      <nav className="dashboard-menu">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activ" : ""
                }
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(DashboardNav);
