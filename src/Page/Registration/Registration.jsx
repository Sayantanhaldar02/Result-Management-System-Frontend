import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.gif";
import { useEffect, useState } from "react";
import { useRegistrationMutation } from "../../Api/Auth_api/Auth_api";
import { toast } from "react-toastify";
export default function RegistrationForm() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })

  const handelOnChnage = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()
  const [userRegister, registrationResponse] = useRegistrationMutation()
  const handelSubmit = async (e) => {
    e.preventDefault();
    await userRegister(userDetails).unwrap();
    // console.log(userDetails)
  };

  useEffect(() => {
    if (registrationResponse.isSuccess) {
      toast.success("registration successful");
      navigate("/", { replace: true })
    }
    if (registrationResponse.isError) {
      toast.error(registrationResponse.error.data.error);
    }
  }, [registrationResponse.isSuccess, registrationResponse.isError, registrationResponse.error])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full flex items-center justify-center">
          <span>
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-20 w-20"
            />
          </span>
          <span className="mb-3 text-[30px]">Result Management System</span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
          <form onSubmit={handelSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={handelOnChnage}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handelOnChnage}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have account?{' '}
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
