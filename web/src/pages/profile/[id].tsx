import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAccountCircle } from "react-icons/md";

import CustomImage from "../../components/CustomImage";
import Button from "../../components/Inputs/Button";
import CreatedCollectionList from "../../components/Layout/Profile/CreatedCollectionList";
import CreatedImageList from "../../components/Layout/Profile/CreatedImageList";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { getUser } from "../../requests/fetch";
import { transitionVariants } from "../../styles/motion-definitions";

export default function Profile() {
  //#region Hooks

  useAuthRedirect();

  const router = useRouter();

  const [view, setView] = useState<"created" | "collections">("created");

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user_profile", router.query.id],
    queryFn: () => getUser({ userName: router.query.id as string }),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!router.query.id,
  });

  //#endregion

  //#region Handlers

  const handleViewChange = (view: "created" | "collections") => {
    setView(view);
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
            {profileData.image ? (
              <CustomImage
                className="h-48 w-48 rounded-full object-cover"
                src={profileData.image}
                alt="name"
              />
            ) : (
              <div className="h-48 w-48">
                <MdAccountCircle className="h-full w-full text-slate-800" />
              </div>
            )}
            <p className="text-xl">@{profileData.name}</p>
            <p>{profileData.postCount.toLocaleString()} posts created</p>
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
