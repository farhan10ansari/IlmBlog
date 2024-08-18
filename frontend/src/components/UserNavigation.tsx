import { Link } from "react-router-dom";
import AnimationWrapper from "./ui/PageAnimation";
import { IconPencilPlus } from "@tabler/icons-react";
import { useContext } from "react";
import { UserContext } from "@/hooks/UserContext";
import { removeFromSession } from "@/lib/session";

const UserNavigation = () => {
    const { userAuth: { username }, setUserAuth } = useContext(UserContext)

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({})
    }

    return (
        <AnimationWrapper
            className="absolute right-2 z-50 top-20"
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white border border-gray-200 w-60 duration-200 rounded-lg">
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                    <IconPencilPlus size={20} />
                    <p>write</p>
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>
                <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
                    Dashboard
                </Link>
                <Link to={`/settings/edit-profile`} className="link pl-8 py-4">
                    Settings
                </Link>

                <button className="text-left p-4 hover:bg-gray-200 w-full pl-8 py-4 border-t"
                    onClick={signOutUser}
                >
                    <h1 className="font-bold text-xl">Sign Out</h1>
                    <p className="text-gray-400">@{username}</p>
                </button>
            </div>

        </AnimationWrapper>
    )
}



export default UserNavigation;