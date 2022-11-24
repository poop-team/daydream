import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward } from "react-icons/md";

import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { login, register } from "../requests/mutate";
import { transitionVariants } from "../styles/motion-definitions";
import { storeAuthSession } from "../utils/storage";

export default function AuthPage() {
  //# region Hooks

  useAuthRedirect();

  const router = useRouter();

  const [action, setAction] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: mutateLogin, isLoading: isLoggingIn } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      storeAuthSession(data);
      // Redirect to the previous page. If there is no previous page, it will redirect to the feed.
      void router.back();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { mutate: mutateRegister, isLoading: isRegistering } = useMutation({
    mutationFn: () => register(name, email, password),
    onSuccess: () => {
      toast.success("Account created successfully!");
      mutateLogin();
    },
    onError: (err: Error) => {
      toast.error(
        "Failed to create account. The email may already be in use by another account."
      );
    },
  });

  //# endregion

  //#region Handlers

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (action === "login") {
      if (!emailInvalid && !passwordInvalid) {
        mutateLogin();
      }
    } else {
      if (
        !nameInvalid &&
        !emailInvalid &&
        !passwordInvalid &&
        !confirmPasswordInvalid
      ) {
        mutateRegister();
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
  const confirmPasswordInvalid =
    (!confirmPassword || confirmPassword !== password) && isRegister;
  const confirmPasswordHelperText = confirmPasswordInvalid
    ? "Passwords do not match"
    : "";

  const isLoading = isLoggingIn || isRegistering;
  const isDisabled = isLogin
    ? email.trim() === "" || password.trim() === "" // Login
    : emailInvalid || passwordInvalid || confirmPasswordInvalid; // Register

  //#endregion

  return (
    <motion.main
      className={"flex h-screen flex-col items-center justify-center gap-8 p-4"}
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
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
            label={"Name:"}
            value={name}
            autoComplete={"name"}
            placeholder={"Enter your name here..."}
            error={nameInvalid}
            helperText={nameHelperText}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
            className={"w-full"}
          />
        )}
        <TextField
          label={"Email:"}
          value={email}
          autoComplete={"email"}
          placeholder="Enter your email address..."
          error={emailInvalid}
          helperText={emailHelperText}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          className={"w-full"}
        />
        <TextField
          label={"Password:"}
          type={"password"}
          value={password}
          autoComplete={isLogin ? "current-password" : "new-password"}
          placeholder={"Enter your password..."}
          error={passwordInvalid}
          helperText={passwordHelperText}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
          className={"w-full"}
        />
        {isRegister && (
          <TextField
            label={"Confirm Password:"}
            type={"password"}
            value={confirmPassword}
            autoComplete={"off"}
            placeholder={"Confirm your password..."}
            error={confirmPasswordInvalid}
            helperText={confirmPasswordHelperText}
            disabled={isLoading}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={"w-full"}
          />
        )}
        <Button
          loading={isLoading}
          disabled={isDisabled}
          className={"mt-4 w-fit"}
        >
          {isLogin
            ? isLoggingIn
              ? "Logging in"
              : "Log in"
            : isRegistering
            ? "Registering"
            : "Register"}
          {!isLoading && (
            <MdArrowForward
              className={
                "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
              }
            />
          )}
        </Button>
      </form>
    </motion.main>
  );
}
