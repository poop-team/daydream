import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward } from "react-icons/md";

import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import useDebounce from "../hooks/useDebounce";
import { getIsUsernameTaken } from "../requests/fetch";
import { login, register, sendPasswordResetEmail } from "../requests/mutate";
import { transitions, transitionVariants } from "../styles/motion-definitions";
import { storeAuthSession } from "../utils/storage";

type Action = "login" | "register" | "reset";

export default function AuthPage() {
  //# region Hooks

  const router = useRouter();

  const [action, setAction] = useState<Action>("login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [waitBeforeResend, setWaitBeforeResend] = useState(0);

  const debouncedUserName = useDebounce(userName, 200);

  const { data: isUserNameTaken, isLoading: isCheckingUserName } = useQuery({
    queryKey: ["auth_user_name_taken", debouncedUserName],
    queryFn: () => getIsUsernameTaken(userName),
    onError: () => {
      toast("Error checking username availability");
    },
  });

  const { mutate: mutateLogin, isLoading: isLoggingIn } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      storeAuthSession(data);
      void router.push("/feed");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { mutate: mutateRegister, isLoading: isRegistering } = useMutation({
    mutationFn: () => register(userName, email, password),
    onSuccess: ({ userId }) => {
      toast.success("Account created successfully!");
      void router.push({
        pathname: "/auth/confirmEmail",
        query: { userId, email },
      });
    },
    onError: () => {
      toast.error(
        "Failed to create account. The email may already be in use by another account."
      );
    },
  });

  const { mutate: mutateSendResetEmail, isLoading: isSendingResetEmail } =
    useMutation({
      mutationFn: () => sendPasswordResetEmail(email),
      onSuccess: () => {
        toast.success(
          "Email sent, check your inbox! Don't forget to also check spam if you don't see it"
        );

        let timerSecs = 30;
        setWaitBeforeResend(timerSecs);
        const interval = setInterval(() => {
          setWaitBeforeResend(--timerSecs);
          if (timerSecs === 0) {
            clearInterval(interval);
          }
        }, 1000);
      },
      onError: () => {
        toast.error("Failed to send email");
      },
    });

  useEffect(() => {
    if (
      ["login", "register", "reset"].includes(router.query.action as string)
    ) {
      setAction(router.query.action as Action);
    }
  }, [router.query.action]);

  //#endregion

  //#region Handlers

  const handleActionChange = (action: Action) => {
    void router.push(
      {
        query: { action },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (action === "login") {
      if (!emailInvalid && !passwordInvalid) {
        mutateLogin();
      }
    } else if (action === "register") {
      if (
        !userNameInvalid &&
        !emailInvalid &&
        !passwordInvalid &&
        !confirmPasswordInvalid
      ) {
        mutateRegister();
      }
    } else if (action === "reset") {
      if (!emailInvalid) {
        mutateSendResetEmail();
      }
    }
  };

  //#endregion

  //#region Derived State

  const isLogin = action === "login";
  const isRegister = action === "register";
  const isReset = action === "reset";

  const emailInvalid =
    (email.trim() === "" || !email.includes("@")) && (isRegister || isReset);
  const emailHelperText = emailInvalid ? "Invalid email" : "";

  const userNameInvalid = userName.trim() === "" || isUserNameTaken;
  const userNameHelperText =
    userName.trim() === ""
      ? "Username cannot be empty"
      : isUserNameTaken
      ? "Already taken by another user 😞"
      : "";

  const passwordInvalid = password.length < 8 && isRegister;
  const passwordHelperText = passwordInvalid
    ? "Password must be at least 8 characters"
    : "";

  const confirmPasswordInvalid =
    (!confirmPassword || confirmPassword !== password) && isRegister;
  const confirmPasswordHelperText = confirmPasswordInvalid
    ? "Passwords do not match"
    : "";

  const isLoading = isLoggingIn || isRegistering || isSendingResetEmail;
  let isDisabled = false;
  if (isLogin) {
    isDisabled = email.trim() === "" || password.trim() === "";
  } else if (isRegister) {
    isDisabled =
      isCheckingUserName ||
      userNameInvalid ||
      emailInvalid ||
      passwordInvalid ||
      confirmPasswordInvalid;
  } else if (isReset) {
    isDisabled = emailInvalid || waitBeforeResend > 0;
  }

  //#endregion

  return (
    <motion.main
      className={
        "flex h-screen flex-col items-center gap-6 overflow-x-hidden py-16 px-4 sm:gap-8"
      }
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
      <motion.div
        key={"logo"}
        layout
        drag
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
        whileHover={{ cursor: "grab" }}
        whileDrag={{ cursor: "grabbing" }}
        initial={{ scale: 0.6, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={transitions.spring}
        className={
          "relative z-[1] mt-auto min-h-[12rem] min-w-[12rem] sm:min-h-[16rem] sm:min-w-[16rem]"
        }
      >
        <Image
          src={"/images/logo_text.png"}
          alt={"Logo"}
          fill
          priority
          draggable={false}
          sizes={"(max-width: 768px) 100vw, 16rem"}
          // Filter color based on status
          className={`h-full w-full object-contain transition duration-300 ${
            isDisabled ? "hue-rotate-30" : "hue-rotate-0"
          }`}
        />
      </motion.div>
      <motion.div
        layout
        transition={transitions.springStiff}
        className="flex gap-4"
      >
        <Button
          variant={isLogin ? "filled" : "text"}
          onClick={() => handleActionChange("login")}
        >
          Log In
        </Button>
        <Button
          variant={isRegister ? "filled" : "text"}
          onClick={() => handleActionChange("register")}
        >
          Register
        </Button>
        <Button
          variant={isReset ? "filled" : "text"}
          onClick={() => handleActionChange("reset")}
        >
          Reset
        </Button>
      </motion.div>
      <form
        className="mb-auto flex w-full max-w-md flex-col items-center gap-2 pb-4 sm:gap-4"
        onSubmit={handleSubmit}
      >
        <AnimatePresence mode={"popLayout"}>
          {isRegister && (
            <motion.div
              initial={"growOut"}
              animate={"growIn"}
              exit={"growOut"}
              custom={0.1}
              variants={transitionVariants}
              className={"w-full"}
            >
              <TextField
                label={"Username:"}
                value={userName}
                autoComplete={"username"}
                placeholder={"Enter your username here..."}
                error={userNameInvalid}
                helperText={userNameHelperText}
                disabled={isLoading}
                onChange={(e) => setUserName(e.target.value)}
                className={"w-full"}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
        <AnimatePresence mode={"popLayout"}>
          {!isReset && (
            <motion.div
              initial={"growOut"}
              animate={"growIn"}
              exit={"growOut"}
              custom={0.1}
              variants={transitionVariants}
              className={"w-full"}
            >
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
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode={"popLayout"}>
          {isRegister && (
            <motion.div
              initial={"growOut"}
              animate={"growIn"}
              exit={"growOut"}
              custom={0.1}
              variants={transitionVariants}
              className={"w-full"}
            >
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
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout transition={transitions.springStiff}>
          <Button
            loading={isLoading}
            disabled={isDisabled}
            className={"mt-4 w-fit"}
          >
            {isLogin && (isLoggingIn ? "Logging in" : "Log In")}
            {isRegister && (isRegistering ? "Registering" : "Register")}
            {isReset &&
              (isSendingResetEmail
                ? "Sending Recovery Link"
                : waitBeforeResend > 0
                ? `Wait ${waitBeforeResend} seconds before resending`
                : "Send Me a Recovery Link")}
            {!isLoading && !isReset && (
              <MdArrowForward
                className={
                  "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
                }
              />
            )}
          </Button>
        </motion.div>
      </form>
    </motion.main>
  );
}
