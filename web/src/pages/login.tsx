import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import { useState, ChangeEvent, useEffect } from 'react';

import { MdArrowBackIosNew } from "react-icons/md";

import IconButton from "../components/Inputs/IconButton";
import LinkIconButton from "../components/Inputs/LinkIconButton";
import Link from "next/link";


export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        setPassword("");
        setUsername("");
    }, [])

    return (
        <div className={"h-screen"}>
            <div className={"mb-12"}>
                <nav className={"sticky top-0 mb-16 h-12 rounded-b-xl px-4"}>
                    <ul className={"z-10 flex h-full list-none justify-self-start"}>
                        <LinkIconButton href={"/index"}>
                            <MdArrowBackIosNew className={"h-full w-8"}/>
                        </LinkIconButton>
                    </ul>
                </nav>
            </div>
            
            <main className={"container mx-auto w-5/12"}> 
                <p className="text-4xl text-center">Log in</p><br/>
                <div className={"m-10 flex-col items-center justify-center"}>
                    
                    <form> 
                        <label>
                            <TextField label="Enter username or email:" placeholder="Username or Email" onChange={handleUsernameChange} value={username}></TextField> 
                        </label><br/>
                        <label> 
                                {/*@ts-expect-error FIXME typing bug*/} 
                                <TextField label="Enter password:" type="password" placeholder="Password" onChange={handlePasswordChange} value={password}></TextField> 
                        </label><br/><br/>
                        <div className="flex justify-center"> 
                            <Link href="/feed">
                                <Button onClick={() => { console.log("Logged in as: " + {username} + " with password: " + {password})}}>Continue</Button>
                            </Link>
                                 
                        </div> 
                        
                    </form> 

                    
                </div> 
                <div className="flex items-center justify-center">
                    <a className="hover:underline hover:text-blue-700" href={"/register"}>Don't have an account? Sign up!</a>
                </div>
            </main>
        </div>
        
    )
}