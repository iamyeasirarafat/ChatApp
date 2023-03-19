import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [error, setError] = useState();
  console.log(error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setCookie("token", res?.data?.token, {
          path: "/",
          maxAge: 86400, // Expires after 1hr
          sameSite: true,
        });
        router.push("/");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setError(
          error?.response?.data?.message || "Something went wrong, try again"
        );
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left max-w-xl rounded-lg w-full bg-white shadow-lg">
          <h3 class="text-2xl font-bold text-center">Login to your account</h3>
          <form onSubmit={handleSubmit}>
            <div class="mt-4">
              <div>
                <label class="block" for="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required="true"
                  placeholder="Email"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  name="pass"
                  required="true"
                  placeholder="Password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 mt-2">{error}</div>
              )}
              <div className="flex items-baseline justify-between">
                <Link
                  className="text-blue-600 text-sm underline"
                  href="/auth/join"
                >
                  New to site? join
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
