import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
      <div className="flex flex-col w-3/4  rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="navbar bg-base-100  rounded-2xl">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Area</a>
                </li>
                <li>
                  <a>Projects </a>
                </li>
                <li>
                  <a>Resources</a>
                </li>
                <li>
                  <a>Archives</a>
                </li>
              </ul>
            </div>
            <a
              className="btn btn-ghost normal-case text-xl"
              href="/dashboard/area"
            >
              Second Brain
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                {" "}
                <Link href={"/dashboard/project"}>Project</Link>
              </li>
              <li>
                {" "}
                <Link href={"/dashboard/area"}>Area</Link>
              </li>
              <li>
                {" "}
                <Link href={"/dashboard/resource"}>Resources</Link>
              </li>
              <li>
                {" "}
                <Link href={"/dashboard/archives"}>Archives</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
