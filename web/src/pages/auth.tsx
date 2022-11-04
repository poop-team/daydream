import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { MdArrowForward } from "react-icons/md";

import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import { login, register } from "../helpers/mutate";
import { storeAuthSession } from "../utils/storage";

export default function LoginPage() {
  //# region Hooks

  const router = useRouter();

  const [action, setAction] = useState<"login" | "register">("login");
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
          .catch((err) => {
            //TODO: Display some kind of notification for the error, maybe a toast with notistack?
            console.error(err);
          });
      }
    } else {
      // Register
      if (!emailInvalid && !passwordInvalid && !confirmPasswordInvalid) {
        register(email, password)
          .then(() => {
            //TODO: Display some kind of notification telling the user to verify the email, maybe a toast with notistack?
            console.info("User registered successfully 😀");
            setAction("login");
          })
          .catch((err) => {
            //TODO: Display some kind of notification for the error, maybe a toast with notistack?
            console.error(err);
          });
      }
    }
  };

  //#endregion

  //#region Derived State

  const isLogin = action === "login";
  const isRegister = action === "register";

  const emailInvalid =
    (email.trim() == "" || !email.includes("@")) && isRegister;
  const emailHelperText = emailInvalid ? "Invalid email" : "";
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
        <TextField
          label="Email:"
          placeholder="Enter your email address..."
          error={emailInvalid}
          helperText={emailHelperText}
          onChange={(e) => setEmail(e.target.value)}
          className={"w-full"}
        />
        <TextField
          label="Password:"
          type="password"
          placeholder="Enter your password..."
          error={passwordInvalid}
          helperText={passwordHelperText}
          onChange={(e) => setPassword(e.target.value)}
          className={"w-full"}
        />
        {isRegister && (
          <TextField
            label="Confirm Password:"
            name="retype"
            type="password"
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
