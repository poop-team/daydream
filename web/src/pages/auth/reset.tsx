import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "../../components/Inputs/Button";
import TextField from "../../components/Inputs/TextField";
import { resetPassword } from "../../requests/mutate";
import {
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";

export default function Reset() {
  //#region Hooks

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: mutateSetNewPassword, isLoading: isSettingNewPassword } =
    useMutation({
      mutationKey: ["auth_set_new_password"],
      mutationFn: () => resetPassword(password, router.query.token as string),
      onSuccess: () => {
        toast.success("Password reset successfully! Sending you to login page");
        void router.push({
          pathname: "/auth",
          query: { action: "login" },
        });
      },
      onError: (e: Error) => {
        toast.error(e.message);
      },
    });

  //#region Derived State

  const passwordInvalid = password.length < 8;
  const passwordHelperText = passwordInvalid
    ? "Password must be at least 8 characters"
    : "";

  const confirmPasswordInvalid =
    !confirmPassword || confirmPassword !== password;
  const confirmPasswordHelperText = confirmPasswordInvalid
    ? "Passwords do not match"
    : "";

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
      <h1
        className={
          "mt-auto flex flex-col items-center gap-8 text-center text-3xl"
        }
      >
        Reset Password
      </h1>
      <div className="flex w-full max-w-md flex-col items-center gap-2 pb-4 sm:gap-4">
        <TextField
          label={"Password:"}
          type={"password"}
          value={password}
          autoComplete={"new-password"}
          placeholder={"Enter your new password..."}
          error={passwordInvalid}
          helperText={passwordHelperText}
          disabled={isSettingNewPassword}
          onChange={(e) => setPassword(e.target.value)}
          className={"w-full"}
        />
        <TextField
          label={"Confirm Password:"}
          type={"password"}
          value={confirmPassword}
          autoComplete={"off"}
          placeholder={"Confirm your new password..."}
          error={confirmPasswordInvalid}
          helperText={confirmPasswordHelperText}
          disabled={isSettingNewPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={"w-full"}
        />
      </div>
      <motion.div
        layout
        transition={transitions.springStiff}
        className={"mb-auto"}
      >
        <Button
          onClick={() => mutateSetNewPassword()}
          loading={isSettingNewPassword}
          disabled={passwordInvalid || confirmPasswordInvalid}
        >
          {isSettingNewPassword ? "Setting password..." : "Set New Password"}
        </Button>
      </motion.div>
    </motion.main>
  );
}
