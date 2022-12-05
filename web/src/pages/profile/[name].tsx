import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdPermMedia, MdWallpaper } from "react-icons/md";

import Button from "../../components/Inputs/Button";
import CreatedCollectionList from "../../components/Layout/Profile/CreatedCollectionList";
import CreatedImageList from "../../components/Layout/Profile/CreatedImageList";
import ProfileImage from "../../components/Surfaces/ProfileImage";
import { getUser } from "../../requests/fetch";
import { updateUser } from "../../requests/mutate";
import { transitionVariants } from "../../styles/motion-definitions";
import { ErrorResponse } from "../../types/error.type";
import { getAuthSession } from "../../utils/storage";

export default function Profile() {
  //#region Hooks

  const router = useRouter();

  const [view, setView] = useState<"created" | "collections">("created");
  const [isSelf, setIsSelf] = useState(false); // Tracks if the user is viewing their own profile
  const [notFound, setNotFound] = useState(false); // Tracks if the user was not found

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["user_profile", router.query.name],
    queryFn: () => getUser({ userName: router.query.name as string }),
    onSuccess: (user) => {
      setIsSelf(user.id === getAuthSession().userId);
    },
    onError: (err: ErrorResponse) => {
      if (err.cause?.code === 404) {
        setNotFound(true);
      }
      toast.error(err.message);
    },
    refetchOnMount: "always",
    enabled: !!router.query.name && !notFound,
  });

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: updateUser,
    onSuccess: (user) => {
      toast.success("Profile updated");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userAvatar", user.image ?? "");
      void refetchProfile();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // Update the view state when the query param changes
  useEffect(() => {
    const { view } = router.query;
    if (view === "collections") {
      setView("collections");
    } else {
      setView("created");
    }
  }, [router.query]);

  //#endregion

  //#region Handlers

  const handleViewChange = (view: "created" | "collections") => {
    void router.push({
      query: { name: router.query.name, view },
    });
  };

  const handleUpdateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif"
    ) {
      return toast.error(
        "Invalid image type. Only jpg, png and gif are allowed."
      );
    }

    // Read content and send to api
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (!fileReader.result) {
        return toast.error("Could not read file.");
      }
      if (fileReader.result.toString().length > 8 * 1024 * 1024) {
        return toast.error("Image size is too large. Max size is 8MB.");
      }

      updateProfile(fileReader.result.toString());
    };
  };

  //#endregion

  //#region Derived State

  const isCreatedView = view === "created";

  //#endregion

  return (
    <motion.main
      className={"h-screen py-16"}
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
      {isProfileLoading || profileData ? (
        <>
          <AnimatePresence mode={"popLayout"}>
            {!isProfileLoading && profileData ? (
              <motion.div
                key={"profile"}
                initial={"fadeOut"}
                animate={"fadeIn"}
                exit={"fadeOut"}
                variants={transitionVariants}
                className={"flex flex-col items-center gap-4 md:gap-8"}
              >
                <ProfileImage
                  image={profileData.image}
                  onImageChange={handleUpdateImage}
                  isSelf={isSelf}
                  isLoading={isUpdatingProfile}
                />
                <p className="text-xl font-medium">@{profileData.name}</p>
                <div className="flex select-none gap-2 text-lg">
                  <p className="flex items-center gap-1">
                    {profileData.postCount.toLocaleString()}
                    <MdWallpaper />
                  </p>
                  <p>|</p>
                  <p className="flex items-center gap-1">
                    {profileData.collectionCount.toLocaleString()}
                    <MdPermMedia />
                  </p>
                </div>
              </motion.div>
            ) : (
              // Render loading skeleton
              <motion.div
                key={"loading"}
                initial={"fadeOut"}
                animate={"fadeIn"}
                exit={"fadeOut"}
                variants={transitionVariants}
                className={"flex flex-col items-center gap-4 md:gap-8"}
              >
                <div className="h-48 w-48 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={"mt-4 flex justify-center gap-4 sm:mt-12"}>
            <Button
              variant={isCreatedView ? "filled" : "text"}
              onClick={() => handleViewChange("created")}
            >
              Created
            </Button>
            <Button
              variant={isCreatedView ? "text" : "filled"}
              onClick={() => handleViewChange("collections")}
            >
              Collections
            </Button>
          </div>
          <section className={"mt-4 sm:mt-12"}>
            <AnimatePresence mode={"wait"}>
              {isCreatedView ? (
                <motion.div
                  key={"user-created"}
                  animate={"fadeIn"}
                  exit={"fadeOut"}
                  variants={transitionVariants}
                >
                  <CreatedImageList
                    userId={profileData?.id}
                    isProfileLoading={isProfileLoading}
                    isSelf={isSelf}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={"user-collections"}
                  animate={"fadeIn"}
                  exit={"fadeOut"}
                  variants={transitionVariants}
                >
                  <CreatedCollectionList
                    userId={profileData?.id}
                    refetchProfile={() => void refetchProfile()}
                    isProfileLoading={isProfileLoading}
                    isSelf={isSelf}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </>
      ) : (
        <div
          className={"flex h-full flex-col items-center justify-center gap-4"}
        >
          <p className={"text-2xl font-medium"}>Profile not found</p>
          <p className={"text-center text-lg"}>
            The profile you are looking for does not exist.
          </p>
        </div>
      )}
    </motion.main>
  );
}
