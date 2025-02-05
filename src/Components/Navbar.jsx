import React, { useState } from "react";
import { LuMoon ,LuSun} from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";


import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
 
function NavList({ mode, setMode }) {
  console.log("NavList mode:", mode);
  return (
    <ul className="my-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center text-xl text-white hover:text-[#5EEAD4] transition-colors">
          <button onClick={() => setMode(mode === "Dark" ? "Light" : "Dark")} aria-label="Toggle dark mode">
            {mode === "Dark" ? <LuSun className="h-5 w-5" /> : <LuMoon className="h-5 w-5" />}
          </button>
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center text-xl font-extralight text-white hover:text-[#5EEAD4] transition-colors">
        <VscAccount/>
        </a>
      </Typography>
    </ul>
  );
}
 
export function NavbarSimple({ mode, setMode }) {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar 
      variant="filled"
      className="min-w-full px-6 py-3 border-none bg-inherit shadow-none"
      blurred={false}
      fullWidth={true}
    >
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 pl-10 text-2xl"
        >
          Twyn
        </Typography>
        <div className="hidden lg:block">
          <NavList mode={mode} setMode={setMode} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList mode={mode} setMode={setMode} />
      </Collapse>
    </Navbar>
  );
}