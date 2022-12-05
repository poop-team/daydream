import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import CircularProgress from "../../components/Feedback/CircularProgress";
import Button from "../../components/Inputs/Button";
import { confirmEmail, sendConfirmationEmail } from "../../requests/mutate";
import { transitionVariants } from "../../styles/motion-definitions";

export default function ConfirmEmail() {
  //#region Hooks

  const router = useRouter();

  const [waitBeforeResend, setWaitBeforeResend] = useState(0);

  const { data: emailConfirmed, isFetching: isConfirmingEmail } = useQuery({
    queryKey: ["auth_email_confirmed", router.query.token],
    queryFn: () =>
      confirmEmail(router.query.userId as string, router.query.token as string),
    enabled: !!router.query.token,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const {
    mutate: mutateSendConfirmationEmail,
    isLoading: isSendingConfirmationEmail,
  } = useMutation({
    mutationKey: ["auth_send_confirmation_email"],
    mutationFn: () =>
      sendConfirmationEmail(
        router.query.email as string,
        router.query.userId as string
      ),
    onSuccess: () => {
      toast.success("Verification email sent successfully!");

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
      toast.error("Failed to send verification email");
    },
  });

  //#endregion

  if (emailConfirmed) {
    setTimeout(() => {
      void router.push("/auth?action=login");
    }, 5000);
  }

  return (
    <motion.main
      className={
        "flex h-screen flex-col items-center gap-6 overflow-x-hidden p-4 py-16 text-justify sm:gap-8 [&>p]:text-center [&>p]:text-xl"
      }
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
      <p className={"mt-auto flex flex-col items-center gap-8"}>
        {router.query.token ? (
          isConfirmingEmail ? (
            <>
              <CircularProgress className={"scale-[200%]"} />
              Confirming email...
            </>
          ) : emailConfirmed ? (
            <>
              {emailConfirmed.message}
              <br />
              Redirecting to login...
            </>
          ) : (
            "Could not confirm email. This may be because the link is invalid or expired"
          )
        ) : (
          "Verification link sent to the provided email, check your inbox!"
        )}
      </p>
      <div className={"mb-auto"}>
        <AnimatePresence initial={false}>
          {(!emailConfirmed || !router.query.token) && !isConfirmingEmail && (
            <motion.div
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
              variants={transitionVariants}
            >
              <Button
                onClick={() => mutateSendConfirmationEmail()}
                loading={isSendingConfirmationEmail}
                disabled={waitBeforeResend > 0}
              >
                {waitBeforeResend > 0
                  ? `Wait ${waitBeforeResend} seconds before resending`
                  : isSendingConfirmationEmail
                  ? "Sending..."
                  : "Send Another Email"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
