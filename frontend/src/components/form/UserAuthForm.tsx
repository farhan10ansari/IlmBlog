import AnimationWrapper from "@/components/ui/PageAnimation";
import FormInput from "@/components/ui/FormInput";
import googleIcon from "@/imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { FC, useContext } from "react";
import { IconUser, IconMail, IconKey } from "@tabler/icons-react";
import { emailRegex, passwordRegex } from "@/lib/utils";
import toast from "react-hot-toast";
import api from "@/services/api"
import { storeInSession } from "@/lib/session";
import { UserContext } from "@/hooks/UserContext";

type UserAuthFormProps = {
  type: "sign-in" | "sign-up"
}

type TFormData = {
  fullname: string
  email: string
  password: string
}


const UserAuthForm: FC<UserAuthFormProps> = ({ type }) => {
  const { userAuth: { access_token }, setUserAuth } = useContext(UserContext)


  console.log(access_token)


  const userAuthThroughServer = (serverRoute: string, formData: TFormData) => {
    api.post(serverRoute, formData).then(({ data }) => {
      storeInSession("user", JSON.stringify(data))
      setUserAuth(data)
      console.log(sessionStorage)
    }).catch(({ response }) => {
      toast.error(response.data.error)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //formData
    const serverRoute = type === "sign-in" ? "/signin" : "/signup";

    //
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form) as TFormData
    const { fullname, email, password } = formData
    console.log(formData)

    if (type === "sign-up" && fullname?.length < 3) {
      toast.error("Fullname must be at least 3 characters long")
      return
    }
    if (!email?.length) {
      toast.error("Email is required")
      return
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid")
      return
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
      return
    }

    userAuthThroughServer(serverRoute, formData)


  }

  return (
    access_token ?
      <Navigate to="/" /> :
      <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
          <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
              {type === "sign-in" ? "Welcome back" : "Join us today"}
            </h1>

            {type != "sign-in" ? (
              <FormInput
                name="fullname"
                type="text"
                placeholder="Full Name"
                Icon={IconUser}
              />
            ) : (
              <></>
            )}

            <FormInput
              name="email"
              type="email"
              placeholder="Email"
              Icon={IconMail}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              Icon={IconKey}
            />

            <button
              className="btn-dark center mt-14"
              type="submit"
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </button>

            <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
              <hr className="w-1/2 border-black" />
              <p>or</p>
              <hr className="w-1/2 border-black" />
            </div>

            <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
              <img src={googleIcon} className="w-5" />
              continue with google
            </button>

            {type === "sign-in" ? (
              <p className="mt-6 text-gray-600 text-xl text-center">
                Don't have an account?
                <Link to="/signup" className="underline text-black text-xl ml-1">
                  Join us today
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-gray-600 text-xl text-center">
                Already a member ?
                <Link to="/signin" className="underline text-black text-xl ml-1">
                  Sign in here
                </Link>
              </p>
            )}
          </form>
        </section>
      </AnimationWrapper>
  );
};

export default UserAuthForm;
