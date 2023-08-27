import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../containers/sidebar/Sidebar";
import "./AdminPage.scss";
import { EAuthToken } from "../../interfaces/auth-interface";
import * as RoutePaths from "../../routes/paths";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { TRootState } from "../../stores/reducers";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { toastError, toastInfo } from "../../utils/notifications-utils";

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const handleClickUser = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFeatureNotAvailable = () => {
    toastInfo("This feature will be available in the future");
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateProfile = () => {
    navigate(RoutePaths.PROFILE);
  };

  const handleLogout = () => {
    localStorage.removeItem(EAuthToken.ACCESS_TOKEN);
    localStorage.removeItem(EAuthToken.REFRESH_TOKEN);
    localStorage.removeItem("persist:root");
    handleClose();
    window.location.href = RoutePaths.SIGNIN;
  };

  if (!accessToken) {
    return <Navigate to={RoutePaths.SIGNIN} replace />;
  }
  return (
    <div className="AdminPage">
      <div className="AdminPage__sidebar">
        <div className="AdminPage__sidebar-user">
          <div className="AdminPage__sidebar-avt">
            <Avatar
              alt="hqdat"
              src="/src/assets/img/avatar.jpg"
              sx={{ width: "64px", height: "64px" }}
            />
          </div>
          <div className="AdminPage__sidebar-name">{userData?.name}</div>
          <div className="AdminPage__sidebar-role">
            {userData?.roles[0].name}
          </div>
        </div>
        <div className="divider"></div>
        <div className="AdminPage__sidebar-menu">
          <Sidebar />
        </div>
      </div>
      <div className="AdminPage__content">
        <div className="AdminPage__navbar">
          <div className="AdminPage__navbar-title">Enroll Course</div>
          <div className="AdminPage__navbar-actions">
            <div
              className="AdminPage__navbar-user"
              onClick={(e) => handleClickUser(e)}
            >
              <Avatar
                alt="hqdat"
                src="/src/assets/img/avatar.jpg"
                sx={{ width: "32px", height: "32px" }}
              />
              <div className="AdminPage__navbar-user-name">
                {userData?.name}
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={handleNavigateProfile}
                className="Navbar__menu-item"
              >
                <PersonOutlineOutlinedIcon /> My account
              </MenuItem>
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <SettingsIcon /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} className="Navbar__menu-item">
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="AdminPage__outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
