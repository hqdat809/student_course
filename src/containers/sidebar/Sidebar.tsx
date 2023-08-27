import React, { useEffect } from "react";
import * as routePath from "../../routes/paths";
import { useLocation, useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import "./Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.COURSE && "Sidebar__item-active"
          }`}
        >
          <SchoolRoundedIcon /> Course
        </div>
      ),
      route: routePath.COURSE,
    },
  ];

  const renderSidebarItem = (
    data: { label: JSX.Element; route: string },
    key: number
  ) => {
    const { label, route } = data;

    return (
      <div
        key={key}
        onClick={() => navigate(route, { replace: true })}
        className="Sidebar__item"
      >
        {label}
      </div>
    );
  };
  return (
    <div className="Sidebar">
      {tabs.map((tab, key) => renderSidebarItem(tab, key))}
    </div>
  );
};

export default Sidebar;
