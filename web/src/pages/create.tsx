import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowForward, MdAutoFixHigh, MdHistory } from "react-icons/md";

import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import ImageList from "../components/Layout/ImageList";
import StyleList from "../components/Layout/StyleList";
import { createImageLoadingTexts as loadingTexts } from "../data/loading-texts";
import { imageStyles } from "../data/styles";
import useIsClient from "../hooks/useIsClient";
import { getUser, searchPosts } from "../requests/fetch";
import { createPost } from "../requests/mutate";
import { transitions, transitionVariants } from "../styles/motion-definitions";
import { ErrorResponse } from "../types/error.type";
import { getAuthSession } from "../utils/storage";

export default function Create() {
  //#region Hooks

  const router = useRouter();

  const isClient = useIsClient();

  const [prompt, setPrompt] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState(loadingTexts.start);
  const [cooldownCount, setCooldownCount] = useState(0);

  const {
    data: recentPostsData,
    isLoading: areRecentPostsLoading,
    refetch: refetchRecentPosts,
  } = useQuery({
    queryKey: ["recent_posts"],
    queryFn: () =>
      searchPosts({
        userId: getAuthSession().userId,
        limit: 6,
        recentOnly: true,
      }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    refetchOnMount: "always",
  });

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["user_profile_create"],
    queryFn: () => getUser({ userId: getAuthSession().userId }),
    onSuccess: ({ lastPostCreatedAt }) => {
      if (lastPostCreatedAt) {
        const secondsLeft = Math.ceil(
          (1000 * 25 - (Date.now() - Date.parse(lastPostCreatedAt))) / 1000
        );
        setCooldownCount(secondsLeft > 0 ? secondsLeft : 0);
      } else {
        setCooldownCount(0);
      }
    },
    onError: (err: ErrorResponse) => {
      toast.error(err.message);
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await refetchRecentPosts();
      setCooldownCount(20); // Optimistically update timer
      await refetchProfile();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (cooldownCount > 0) {
      const timeout = setTimeout(() => {
        setCooldownCount((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [cooldownCount]);

  // Dynamically change the loading text.
  useEffect(() => {
    if (isCreating) {
      setLoadingText(loadingTexts.start);
      const timeout1 = setTimeout(() => {
        setLoadingText(loadingTexts.dream);
      }, 2500);
      const timeout2 = setTimeout(() => {
        setLoadingText(loadingTexts.final);
      }, 7000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [isCreating]);

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.prompt) return;

    setPrompt(router.query.prompt as string);
  }, [router.query.prompt]);

  //#endregion

  //#region Handlers

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleCreate = () => {
    let finalPrompt = prompt.trim();
    if (selectedStyles.length > 0) {
      finalPrompt += `, ${selectedStyles.join(", ")}`;
    }
    create(finalPrompt);
  };

  //#endregion

  //#region Derived State

  const isCooldownActive = cooldownCount > 0;
  const isCreateDisabled =
    prompt.trim() === "" || isCreating || isCooldownActive;
  const isAllowedToCreate = isClient && getAuthSession().isAllowedToCreate;

  //#endregion

  return (
    <motion.main
      className={
        "mx-auto flex h-screen max-w-7xl flex-col items-center gap-8 px-4 pt-4 sm:pt-20 lg:px-8"
      }
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
      <div className={"relative flex flex-col items-center gap-8"}>
        <TextField
          placeholder={"Epic digital art of..."}
          startIcon={<MdAutoFixHigh className={"h-6 w-6"} />}
          className={"min-w-full"}
          value={prompt}
          onChange={handlePromptChange}
        />
        <StyleList
          styles={imageStyles}
          selectedStyles={selectedStyles}
          setSelectedStyles={setSelectedStyles}
        />
        <motion.div layout transition={transitions.springStiff}>
          <Button
            className={"w-fit"}
            loading={isCreating}
            disabled={isCreateDisabled}
            onClick={handleCreate}
          >
            {isCreating
              ? loadingText
              : isCooldownActive
              ? `${cooldownCount}s cooldown`
              : "Create"}
            {!isCreating && (
              <MdArrowForward
                className={
                  "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
                }
              />
            )}
          </Button>
        </motion.div>
        {!isAllowedToCreate && (
          <div
            className={`absolute top-0 flex h-full w-full max-w-7xl select-none flex-col justify-center gap-4
            bg-slate-900/90 px-4 pt-4 text-center backdrop-blur-sm backdrop-saturate-150 sm:pt-20 lg:px-8 `}
          >
            <h2 className={"text-xl font-semibold tracking-wide sm:text-3xl"}>
              Sorry, you&apos;re not allowed to create {"😞"}
            </h2>
            <p className={"text-base text-slate-300 sm:text-xl"}>
              We&apos;ve limited image generation to users in the <b>ucf.edu</b>{" "}
              domain only. Please sign up with your <b>ucf.edu</b> email to get
              access if you&apos;re a UCF student or faculty.
            </p>
          </div>
        )}
      </div>

      <div className={`mt-4 flex w-full flex-col gap-4 sm:my-8 sm:gap-6`}>
        <h2 className={"w-full text-center text-2xl font-bold"}>
          Recently Created <MdHistory className={"inline-block h-full w-9"} />
        </h2>
        <ImageList
          arePostsLoading={areRecentPostsLoading}
          posts={recentPostsData?.posts ?? []}
          noPostsMessage={"Nothing yet. Create one!"}
          className={"pb-16"}
        />
      </div>
    </motion.main>
  );
}
