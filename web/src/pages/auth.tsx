import { login, register, storeAuthSession } from "@daydream/common";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward } from "react-icons/md";

import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";

export default function AuthPage() {
  //# region Hooks

  const router = useRouter();

  const [action, setAction] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //# endregion

  //#region Handlers

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (action === "login") {
      // Login
      if (!emailInvalid && !passwordInvalid) {
        login(email, password)
          .then(async (data) => {
            if (data) {
              storeAuthSession(data);
              await router.replace("/feed");
            }
          })
          .catch((err: Error) => {
            toast.error(err.message);
          });
      }
    } else {
      // Register
      if (
        !nameInvalid &&
        !emailInvalid &&
        !passwordInvalid &&
        !confirmPasswordInvalid
      ) {
        register(name, email, password)
          .then(() => {
            toast.success("Account created successfully!");
            setAction("login");
          })
          .catch((err: Error) => {
            toast.error(err.message);
          });
      }
    }
  };

  //#endregion

  //#region Derived State

  const isLogin = action === "login";
  const isRegister = action === "register";

  const emailInvalid =
    (email.trim() === "" || !email.includes("@")) && isRegister;
  const emailHelperText = emailInvalid ? "Invalid email" : "";
  const nameInvalid = name.trim() === "";
  const nameHelperText = nameInvalid ? "Name cannot be empty" : "";
  const passwordInvalid = password.length < 8 && isRegister;
  const passwordHelperText = passwordInvalid
    ? "Password must be at least 8 characters"
    : "";
  const confirmPasswordInvalid = confirmPassword !== password && isRegister;
  const confirmPasswordHelperText = confirmPasswordInvalid
    ? "Passwords do not match"
    : "";

  //#endregion

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="flex gap-4">
        <Button
          variant={isLogin ? "filled" : "text"}
          onClick={() => setAction("login")}
        >
          Log In
        </Button>
        <Button
          variant={isRegister ? "filled" : "text"}
          onClick={() => setAction("register")}
        >
          Register
        </Button>
      </div>
      <form
        className="flex w-full max-w-md flex-col items-center gap-2 sm:gap-4"
        onSubmit={handleSubmit}
      >
        {isRegister && (
          <TextField
            label="Name:"
            value={name}
            placeholder="Enter your name here..."
            error={nameInvalid}
            helperText={nameHelperText}
            onChange={(e) => setName(e.target.value)}
            className={"w-full"}
          />
        )}
        <TextField
          label="Email:"
          value={email}
          placeholder="Enter your email address..."
          error={emailInvalid}
          helperText={emailHelperText}
          onChange={(e) => setEmail(e.target.value)}
          className={"w-full"}
        />
        <TextField
          label="Password:"
          type="password"
          value={password}
          placeholder="Enter your password..."
          error={passwordInvalid}
          helperText={passwordHelperText}
          onChange={(e) => setPassword(e.target.value)}
          className={"w-full"}
        />
        {isRegister && (
          <TextField
            label="Confirm Password:"
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password..."
            error={confirmPasswordInvalid}
            helperText={confirmPasswordHelperText}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={"w-full"}
          />
        )}
        <Button className={"mt-4 w-fit"}>
          {isLogin ? "Log in" : "Register"}
          <MdArrowForward
            className={
              "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
            }
          />
        </Button>
      </form>
    </main>
  );
}
