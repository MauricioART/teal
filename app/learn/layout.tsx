import SideNav from '@/app/ui/learn/sidenav';
import Image from'next/image';
import { auth } from '@/auth';
import { Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  
  const session = await auth();
  if (!session?.user) return null;

  return (
    
    <div className=" main-layout h-screen md:overflow-hidden relative">
      <div className='header-div'>
        <div className=' h-full w-full flex items-center justify-between'>
          <div className='flex items-center'>
            <button className='ml-5 sm:visible md:invisible md:hidden '  ><MenuIcon/></button>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-6"
                src="/vector/default-monochrome-black.svg"
                alt="Next.js Logo"
                width={125}
                height={31}
                priority
              />
          </div>
          <div className='flex items-center mr-6'>
            <h2 className='hidden md:block'>{session.user.name}</h2>
            {
              session.user.image && <Avatar className='ml-3 ' src={session.user.image}/>
            }
            
          </div>
        </div>
      </div>
      <div className='h-full w-full hidden md:block'>
        <SideNav/>
      </div>
      <div className='h-full w-full overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}