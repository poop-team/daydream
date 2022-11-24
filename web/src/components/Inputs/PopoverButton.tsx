import {
  type Placement,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ElementType, HTMLAttributes, ReactNode } from "react";

import {
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";

interface Props {
  button: ElementType;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  buttonChildren?: ReactNode;
  popoverPlacement?: Placement;
  className?: string;
  rotateButtonOnOpen?: boolean;
  children(props: { open: boolean; close: () => void }): ReactNode;
}

export default function PopoverButton({
  button,
  buttonProps,
  buttonChildren,
  popoverPlacement = "bottom",
  className = "",
  rotateButtonOnOpen = false,
  children,
}: Props) {
  //#region Hooks

  const { x, y, reference, floating, strategy } = useFloating({
    strategy: "absolute",
    placement: popoverPlacement,
    middleware: [offset(10), shift(), flip()],
  });

  //#endregion

  return (
    <Popover className={`relative select-none ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button as={button} {...buttonProps}>
            <div
              ref={reference}
              className={`${
                rotateButtonOnOpen && open ? "rotate-[30deg]" : "rotate-0"
              } transition-transform duration-200 ease-in-out`}
            >
              {buttonChildren}
            </div>
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel static>
                <motion.div
                  ref={floating}
                  initial={"growOut"}
                  animate={"growIn"}
                  exit={"growOut"}
                  variants={transitionVariants}
                  transition={transitions.springStiff}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  }}
                  className={
                    "w-max rounded-xl bg-slate-200/90 p-2 shadow-md backdrop-blur-md dark:bg-slate-800/90"
                  }
                >
                  {children({ open, close })}
                </motion.div>
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
