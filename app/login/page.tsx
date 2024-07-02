import { SignIn } from "../ui/login/sign-in";
import Image from "next/image";


export default function Page(){
    return(
        <main>
            <div className="flex justify-center items-center h-screen">
                <div className="p-20 rounded-2xl bg-white ">
                    <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mb-20"
                    src="/vector/default-monochrome-black.svg"
                    alt="Next.js Logo"
                    width={200}
                    height={47}
                    priority
                    />
                    <SignIn />
                </div>
            </div>
        </main>
    );
}