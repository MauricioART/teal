import Link from 'next/link';
import NavLinks from './nav-links';
import { Logout } from "@mui/icons-material";
import Image from "next/image";
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div className='mt-10'>
        <NavLinks />
        </div>
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className='' action={async () => {
        "use server"
        await signOut({redirectTo:"/login"})
        }}>
         <button type='submit' className="flex h-[48px] w-full grow items-center justify-center gap-2  p-3 text-sm font-medium  hover:text-teal-500 md:flex-none ">
            <div className='flex flex-col items-center'>
            <Logout  />
            <p className="hidden md:block">LogOut</p>
            </div>
          </button>
        </form>
    </div>
  );
}

