import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../src/utils/firebase";

const Join = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const create = await createUserWithEmailAndPassword(email, password);
    if (create?.user) {
      const createUser = await axios.post("/api/auth/join", {
        name,
        email,
        uid: create?.user?.uid,
      });
      if (createUser.status === 200) {
        setCookie("uid", create?.user?.uid, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        router.push("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left max-w-xl rounded-lg w-full bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Create your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" for="email">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block" for="email">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                name="pass"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <Link
                className="text-blue-600 text-sm underline"
                href="/auth/login"
              >
                Already have account? Login
              </Link>
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
