import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { MdPermMedia, MdWallpaper } from "react-icons/md";

import Button from "../../components/Inputs/Button";
import CreatedCollectionList from "../../components/Layout/Profile/CreatedCollectionList";
import CreatedImageList from "../../components/Layout/Profile/CreatedImageList";
import ProfileImage from "../../components/Surfaces/ProfileImage";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { getUser } from "../../requests/fetch";
import { updateUser } from "../../requests/mutate";
import { transitionVariants } from "../../styles/motion-definitions";
import { getAuthSession } from "../../utils/storage";

export default function Profile() {
  //#region Hooks

  useAuthRedirect();

  const router = useRouter();

  const [view, setView] = useState<"created" | "collections">("created");
  const [isSelf, setIsSelf] = useState(false); // Tracks if the user is viewing their own profile

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["user_profile", router.query.id],
    queryFn: () => getUser({ userName: router.query.id as string }),
    onSuccess: (user) => {
      setIsSelf(user.id === getAuthSession().userId);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!router.query.id,
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

  //#endregion

  //#region Handlers

  const handleViewChange = (view: "created" | "collections") => {
    setView(view);
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
    <main className={"h-screen py-16"}>
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
            <div className="h-48 w-48 animate-pulse rounded-full bg-slate-300" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-slate-300" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-300" />
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
                isProfileLoading={isProfileLoading}
                isSelf={isSelf}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
