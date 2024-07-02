import SideNav from '@/app/ui/learn/sidenav';
import Image from'next/image';
import { auth } from '@/auth';
import { Avatar } from "@mui/material"
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  
  const session = await auth();
  if (!session?.user) return null;

  {/*
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-40">
      <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-4">{children}</div>
    </div>*/}
  return (
    
    <div className=" main-layout h-screen md:overflow-hidden">
      <div className=' header-div'>
        <div className=' h-full w-full flex items-center justify-between'>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-6"
            src="/vector/default-monochrome-black.svg"
            alt="Next.js Logo"
            width={125}
            height={31}
            priority
          />
          <div className='flex items-center mr-6'>
            <h2>{session.user.name}</h2>
            {
              session.user.image && <Avatar className='ml-3 ' src={session.user.image}/>
            }
            
          </div>
        </div>
      </div>
      <div className='h-full w-full '>
        <SideNav/>
      </div>
      <div className='h-full w-full overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}