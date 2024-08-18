import { useContext, useState } from "react";
import logo from "@/imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { IconSearch, IconPencilPlus } from "@tabler/icons-react";
import { UserContext } from "@/hooks/UserContext";
import { IconBell } from "@tabler/icons-react";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState<boolean>(false);
  const { userAuth: { access_token, profile_img } } = useContext(UserContext)
  const [userNavPanel, setUserNavPanel] = useState(false)

  const handleUserNavPanel = () => {
    setUserNavPanel(currVal => !currVal)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false)
    }, 200)
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray-200 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? "show" : "hide"
            }`}
        >
          <input
            type="text"
            placeholder="search"
            className="w-full md:w-auto bg-gray-200 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-600 md:pl-12"
          />
          <IconSearch className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-600" size={20} />
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden text-2xl bg-gray-200 w-12 h-12 rounded-full flex items-center  justify-center"
            onClick={() =>
              setSearchBoxVisibility((currentValue) => !currentValue)
            }
          >
            <IconSearch color="gray" size={20} />
          </button>

          {
            userNavPanel &&
            <UserNavigation />
          }

          <Link to="/editor" className="hidden md:flex gap-2 link rounded-full border-2 items-center py-2 px-3 font-medium text-gray-600">
            <IconPencilPlus size={20} />
            <p>write</p>
          </Link>
          {
            access_token ?
              <>
                <Link to="/dashboard/notification">
                  <button className="h-12 w-12 rounded-full bg-gray-200 hover:bg-black/20">
                    <IconBell className="block mx-auto my-auto text-neutral-800" />
                  </button>
                </Link>

                <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                  <button className="w-12 h-12 mt-1">
                    <img src={profile_img} className="w-full h-full object-cover rounded-full hover:scale-95 transition-transform duration-200 " />
                  </button>
                </div>
              </>
              :
              <>
                <Link to="/signin" className="btn-dark py-2">
                  Sign In
                </Link>

                <Link to="/signup" className="btn-light py-2 hidden md:block">
                  Sign Up
                </Link>
              </>
          }
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
