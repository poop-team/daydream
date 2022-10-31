import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import { useState } from 'react';

import Link from "next/link";
import { useRouter } from 'next/router';

export default function LoginPage() {

    //# region Hooks
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    //# endregion

    const handleContinue = () => {
        router.replace('/feed')
    };

    return (
        <div className="h-screen mt-24">
            <main className="container mx-auto w-5/12"> 
                <p className="text-4xl text-center">Log in</p><br/>
                <div className="m-10 flex-col items-center justify-center">
                    <form> 
                        <label>
                            <TextField label="Enter username or email:" placeholder="Username or Email" onChange={(e) => setUsername(e.target.value)}></TextField> 
                        </label><br/>
                        <label>  
                                <TextField label="Enter password:" type="password" placeholder="Password" onChange={(e => setPassword(e.target.value))}></TextField> 
                        </label><br/><br/>
                        <div className="flex justify-center"> 
                            <Button onClick={handleContinue}>Continue</Button>
                        </div> 
                    </form>
                </div> 
                <div className="flex items-center justify-center">
                    <Link href="/register">
                        <a className="hover:underline hover:text-blue-700">Don't have an account? Sign up!</a>
                    </Link>
                </div>
            </main>
        </div>
    )
}