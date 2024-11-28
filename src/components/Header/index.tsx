import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 bg-black duration-200 dark:bg-white ${
                    !props.sidebarOpen && "!h-0 delay-0"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 block h-0.5 w-full bg-black duration-200 dark:bg-white ${
                    !props.sidebarOpen && "!h-0 delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Custom Text in Place of Search */}
        <div className="hidden sm:block">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Welcome to Your Dashboard!
          </p>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">

          {/* User Area */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
