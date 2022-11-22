import { useMutation, useQuery } from "@tanstack/react-query";
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
import useAuthRedirect from "../hooks/useAuthRedirect";
import { searchPosts } from "../requests/fetch";
import { createPost } from "../requests/mutate";
import { getAuthSession } from "../utils/storage";

export default function Create() {
  //#region Hooks

  useAuthRedirect();

  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState(loadingTexts.start);

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
  });

  const { mutate: create, isLoading: isCreating } = useMutation(createPost, {
    onSuccess: async () => {
      await refetchRecentPosts();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

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

  const isCreateDisabled = prompt.trim() === "" || isCreating;

  //#endregion

  return (
    <main
      className={
        "mx-auto flex h-screen max-w-7xl flex-col items-center gap-8 px-4 pt-4 pb-8 sm:pt-16"
      }
    >
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
      <Button
        className={"w-fit"}
        loading={isCreating}
        disabled={isCreateDisabled}
        onClick={handleCreate}
      >
        {isCreating ? loadingText : "Create"}
        {!isCreating && (
          <MdArrowForward
            className={
              "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
            }
          />
        )}
      </Button>
      <div className={`mt-4 flex w-full flex-col sm:mt-8`}>
        <h2 className={"w-full text-center text-2xl font-bold"}>
          Recently Created <MdHistory className={"inline-block h-full w-9"} />
        </h2>
        <div className={"py-8"}>
          <ImageList
            arePostsLoading={areRecentPostsLoading}
            posts={recentPostsData?.posts ?? []}
            noPostsMessage={"Nothing yet. Create one!"}
          />
        </div>
      </div>
    </main>
  );
}
