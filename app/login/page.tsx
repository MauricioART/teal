import { SignIn } from "../ui/login/sign-in";


export default function Page(){
    return(
        <main>
            <div className="flex justify-center items-center h-screen">
                <SignIn />
            </div>
        </main>
    );
}