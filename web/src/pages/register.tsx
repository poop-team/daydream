import Link from 'next/link';
import { useState } from 'react';
import Button from '../components/Inputs/Button';
import TextField from '../components/Inputs/TextField';
import { useRouter } from 'next/router';

export default function RegisterPage() {

    //# region Hooks
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");
    const router = useRouter();
    //# endregion

    const handleContinue = () => {
        router.replace('/feed')
    };

    return (
        <div className="h-screen mt-24">
            <main className="container mx-auto w-5/12"> 
                <p className="text-4xl text-center">Register</p><br/>
                <div className="m-9 flex-col items-center justify-center">
                    <form> 
                        <label className="block mb-8">
                            <TextField label="Enter your email address:" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></TextField> 
                        </label>
                        <label className="block mb-8"> 
                            <TextField label="Enter your username:" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></TextField> 
                        </label> 
                        <label className="block mb-8">
                            <TextField label="Enter your password:" name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></TextField> 
                        </label>
                        <label className="block mb-10">
                            <TextField label="Confirm password:" name="retype" type="password" placeholder="Password" onChange={(e) => setRetype(e.target.value)}></TextField> 
                        </label>
                        <div className="flex justify-center"> 
                            <Button onClick={handleContinue}>Continue</Button>
                        </div> 
                    </form> 
                </div> 
                <div className="flex items-center justify-center">
                    <Link href="/login">
                        <a className="hover:underline hover:text-blue-700">Already have an account? Log in!</a>
                    </Link>
                </div>
            </main>
        </div>
    )
}