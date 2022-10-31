import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import Button from '../components/Inputs/Button';
import LinkIconButton from '../components/Inputs/LinkIconButton';
import TextField from '../components/Inputs/TextField';


export default function RegisterPage() {

    const [state, setState] = useState({
        email:"",
        username: "",
        password: "",
        retype: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({...prev, [e.target.name]:e.target.value}));
    }


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
                <p className="text-4xl text-center">Register</p><br/>
                <div className={"m-10 flex-col items-center justify-center"}>
                    
                    <form> 
                        {/*@ts-expect-error NAME BUG */}
                        <TextField label="Enter your email address:" name="email" placeholder="Email" onChange={handleChange}></TextField> 
                        <br/>
                        {/*@ts-expect-error FIXME typing bug*/} 
                        <TextField label="Enter your username:" name="username" placeholder="Username" onChange={handleChange}></TextField> 
                        <br/>
                        {/*@ts-expect-error FIXME typing bug*/} 
                        <TextField label="Enter your password:" name="password" type="password" placeholder="Password" onChange={handleChange}></TextField> 
                        <br/>
                        {/*@ts-expect-error FIXME typing bug*/} 
                        <TextField label="Confirm password:" name="retype" type="password" placeholder="Password" onChange={handleChange}></TextField> 
                        <br/><br/>
                        <div className="flex justify-center"> 
                            <Link href="/index">
                                <Button onClick={() => { console.log("Registered as email: " + state['email'] + " username: " + state['username'] + " with password: " + state['password'] + " with retype " + state['retype'])}}>Register</Button>
                            </Link>
                                 
                        </div> 
                        
                    </form> 

                    
                </div> 
                <div className="flex items-center justify-center">
                    <a className="hover:underline hover:text-blue-700" href={"/register"}>Already have an account? Log in!</a>
                </div>
            </main>
        </div>
    )
}