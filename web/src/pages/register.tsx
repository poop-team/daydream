import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import Button from '../components/Inputs/Button';
import LinkIconButton from '../components/Inputs/LinkIconButton';
import TextField from '../components/Inputs/TextField';


export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");

    return (
        <div className="h-screen">
            <div className="mb-12">
                <nav className="sticky top-0 mb-16 h-12 rounded-b-xl px-4">
                    <ul className="z-10 flex h-full list-none justify-self-start">
                        <LinkIconButton href="/index">
                            <MdArrowBackIosNew className="h-full w-8"/>
                        </LinkIconButton>
                    </ul>
                </nav>
            </div>
            
            <main className="container mx-auto w-5/12"> 
                <p className="text-4xl text-center">Register</p><br/>
                <div className="m-10 flex-col items-center justify-center">
                    <form> 
                        <TextField label="Enter your email address:" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></TextField> 
                        <br/> 
                        <TextField label="Enter your username:" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></TextField> 
                        <br/> 
                        <TextField label="Enter your password:" name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></TextField> 
                        <br/>
                        <TextField label="Confirm password:" name="retype" type="password" placeholder="Password" onChange={(e) => setRetype(e.target.value)}></TextField> 
                        <br/><br/>
                        <div className="flex justify-center"> 
                            <Link href="/index">
                                <Button onClick={() => { console.log("Registered as email: " + {email} + " username: " + {username} + " with password: " + {password} + " with retype " + {retype})}}>Register</Button>
                            </Link>
                        </div> 
                    </form> 
                </div> 
                <div className="flex items-center justify-center">
                    <a className="hover:underline hover:text-blue-700" href="/login">Already have an account? Log in!</a>
                </div>
            </main>
        </div>
    )
}