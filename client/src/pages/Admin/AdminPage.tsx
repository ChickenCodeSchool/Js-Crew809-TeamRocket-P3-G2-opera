import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBarAdmin/SideBar";
import "./AdminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-dashboard">
        <Outlet />
      </main>
    </div>
  );
}
