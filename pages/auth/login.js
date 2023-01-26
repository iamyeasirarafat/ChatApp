import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../src/utils/firebase";

const Login = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const login = await signInWithEmailAndPassword(email, password);
    if (login?.user) {
      setCookie("uid", login?.user?.uid, {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      router.push("/");
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
                  placeholder="Email"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  name="pass"
                  placeholder="Password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
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
