import { authenticate } from "@/app/lib/actions";

export  function LoginForm(){

    return(
        <div className="flex justify-center mx-10 my-6 p-10">
            <form className="flex flex-col justify-center">
                <div>
                    <input type="text" name="email" placeholder="Email" id="email" required />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" id="password" required/>
                </div>
                <button type="submit"> Log In</button>
            </form>

        </div>
    );
} 