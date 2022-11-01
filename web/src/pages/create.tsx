import { ChangeEvent, useState } from "react";
import { MdArrowForward, MdAutoFixHigh, MdHistory } from "react-icons/md";

import Button from "../components/Inputs/Button";
import SelectableChip from "../components/Inputs/SelectableChip";
import TextField from "../components/Inputs/TextField";
import Card from "../components/Surfaces/Card";
import { imageStyles } from "../data/styles";

export default function Create() {
  //#region Hooks

  const [prompt, setPrompt] = useState<string>("");
  const [styles, setStyles] = useState<string[]>(imageStyles);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  //#endregion

  //#region Handlers

  const handleStyleSelect = (style: string, selected: boolean) => {
    if (selected) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);

    // Change the order of the styles based on if the style was already typed in the prompt.
    // It should appear last if it was already typed.
    // if (value.trim() !== prompt) {
    //   const newStyles = [...styles];
    //   const index = newStyles.findIndex((s) =>
    //     value.trim().toLowerCase().includes(s.trim().toLowerCase())
    //   );
    //   if (index !== -1) {
    //     newStyles.push(newStyles.splice(index, 1)[0]);
    //     setStyles(newStyles);
    //   }
    // }
  };

  //#endregion

  return (
    <main
      className={
        "mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-8 px-4 pt-16 pb-8"
      }
    >
      <TextField
        placeholder={"Epic professional digital art of..."}
        startIcon={<MdAutoFixHigh className={"h-6 w-6"} />}
        className={"min-w-full"}
        value={prompt}
        onChange={handlePromptChange}
      />
      <ul className={"flex list-none flex-wrap justify-between gap-4"}>
        {styles.map((style, idx) => (
          <li key={idx}>
            <SelectableChip
              label={style}
              selected={selectedStyles.includes(style)}
              onSelect={handleStyleSelect}
            />
          </li>
        ))}
      </ul>
      <Button className={"w-fit"}>
        Create
        {/* Displace x on hover */}
        <MdArrowForward
          className={
            "h-full w-6 transition duration-200 ease-in-out group-hover:translate-x-0.5"
          }
        />
      </Button>
      <div className={"mt-8 flex w-full flex-col gap-4"}>
        <h2 className={"text-2xl font-bold"}>
          Recently Created <MdHistory className={"inline-block h-full w-9"} />
        </h2>
        <div className={"flex justify-between"}>
          <Card className={"h-96 w-96 bg-slate-200"} />
          <Card className={"h-96 w-96 bg-slate-200"} />
          <Card className={"h-96 w-96 bg-slate-200"} />
        </div>
      </div>
    </main>
  );
}
