import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import { useState, ChangeEvent } from 'react';

import { MdArrowBackIosNew } from "react-icons/md";

import IconButton from "../components/Inputs/IconButton";
import LinkIconButton from "../components/Inputs/LinkIconButton";


export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <nav className={"sticky top-0 -mb-12 h-12 rounded-b-xl px-4"}>
                <ul className={"z-10 flex h-full list-none justify-self-start"}>
                    <LinkIconButton href={"/feed"}>
                        <MdArrowBackIosNew className={"h-full w-8"}/>
                    </LinkIconButton>
                </ul>
            </nav>
            <div className="m-12 justify-center"> 
                <div className="self-center"> 
                    <form className=""> 
                        <label>
                            <TextField label="Username" placeholder="Enter username or email" onChange={handleUsernameChange} value={username}></TextField> 
                        </label> 
                        <label> 
                                {/*@ts-expect-error FIXME typing bug*/} 
                                <TextField label="Password" type="password" placeholder="Enter password" onChange={handlePasswordChange} value={password}></TextField> 
                        </label> 
                        <div> 
                            <Button onClick={() => { console.log("Logged in as: " + {username} + " with password: " + {password})}}>Login</Button> 
                        </div> 
                        <div>
                            Logged in as: {username} with {password}
                        </div> 
                    </form> 
                </div> 
            </div>
        </>
        
    )
}