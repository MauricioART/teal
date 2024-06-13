import SideNav from '@/app/ui/learn/sidenav';
import Image from'next/image';
import { auth } from '@/auth';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-4">{children}</div>
    </div>
  );
}