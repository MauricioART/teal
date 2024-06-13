
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <div className="flex flex-col justify-center border p-5 border-slate-900">
    <form
      action={async () => {
        "use server"
        await signIn("github",{ redirectTo: "/learn" })
      }} className=" bg-blue-500 m-2 p-2 border border-slate-900"
    >
      <button type="submit">Signin with GitHub</button>
    </form>
    <form
    action={async () => {
      "use server"
      await signIn("google",{ redirectTo: "/learn" })
    }} className=" bg-gray-200 m-2 p-2 border border-slate-900"
  >
    <button type="submit">Signin with Google</button>
  </form>
  </div>
  )
} 