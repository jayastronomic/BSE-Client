import React from "react";
import ProfileNav from "./ProfileNav";
import { Outlet } from "react-router-dom";

const ProfileViews = () => {
  return (
    <div className="flex h-full w-full">
      <ProfileNav />
      <Outlet />
    </div>
  );
};

export default ProfileViews;
