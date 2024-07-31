import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { login, logout } from "@/redux/slices/authSlices";
import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  ArrowDownToLine,
  BellDot,
  ChartLine,
  ChevronsRight,
  CirclePlus,
  Loader,
  Settings,
  SquareKanban,
  Users,
  UserIcon,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  openTaskForm: () => void; // Add a prop type for the callback function
}

const Sidebar: React.FC<SidebarProps> = ({ openTaskForm }) => { // Accept the callback prop
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const res = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (res.ok) {
            dispatch(login({ token, user: data.user }));
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    Cookies.remove("token");
    dispatch(logout());
    router.push("/");
  };

  return (
    <section className="w-72 p-4 h-screen flex flex-col justify-between bg-white">
      <div>
        <div className="flex items-center gap-2">
          <UserIcon />
          <p className="font-medium text-2xl">
            {user ? `${user.name}` : "Loading..."}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-gray-500">
            <BellDot />
            <Loader />
            <ChevronsRight />
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-500 p-2 rounded-md"
          >
            Logout
          </button>
        </div>
        <div>
          <div className="flex gap-2 w-full p-2 hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-300 text-gray-600 font-normal rounded-sm mt-6">
            <Image
              src="/home.svg"
              width={25}
              height={25}
              alt="image"
              className="text-gray-400"
            />
            <p>Home</p>
          </div>
          <div className="flex gap-2 w-full p-2 hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-300 text-gray-600 font-normal rounded-sm">
            <SquareKanban className="text-gray-400" />
            <p>Boards</p>
          </div>
          <div className="flex gap-2 w-full p-2 hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-300 text-gray-600 font-normal rounded-sm">
            <Settings className="text-gray-400" />
            <p>Settings</p>
          </div>
          <div className="flex gap-2 w-full p-2 hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-300 text-gray-600 font-normal rounded-sm">
            <Users className="text-gray-400" />
            <p>Teams</p>
          </div>
          <div className="flex gap-2 w-full p-2 hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-300 text-gray-600 font-normal rounded-sm">
            <ChartLine className="text-gray-400" />
            <p>Analytics</p>
          </div>
        </div>
        <nav className="mt-4 mb-2">
          <button
            onClick={openTaskForm} // Use the callback prop
            className="bg-indigo-800 text-white font-medium p-3 rounded-md flex gap-4"
            style={{ background: 'background: linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)' }}>
            Create new task
            <CirclePlus className="bg-white text-indigo-700 rounded-full" />
          </button>
        </nav>
      </div>
      <div className="flex gap-3 bg-zinc-100 text-gray-600 font-normal rounded-md p-2">
        <ArrowDownToLine className="text-gray-500 w-10 h-10" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-500">Download the app</span>
          <span className="text-xs text-gray-500 font-normal">Get the full experience</span>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
