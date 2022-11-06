import SelectableChip from "../Inputs/SelectableChip";

interface Props {
  styles: string[];
  selectedStyles: string[];
  setSelectedStyles: (styles: string[]) => void;
  className?: string;
}

export default function StyleList({
  styles,
  selectedStyles,
  setSelectedStyles,
  className = "",
}: Props) {
  //#region Handlers

  const handleStyleSelect = (style: string, selected: boolean) => {
    if (selected) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    }
  };

  //#endregion

  return (
    <ul
      className={`flex list-none flex-wrap justify-between gap-2 sm:gap-4 ${className}`}
    >
      {styles.map((style) => (
        <li key={style}>
          <SelectableChip
            label={style}
            selected={selectedStyles.includes(style)}
            onSelect={handleStyleSelect}
          />
        </li>
      ))}
    </ul>
  );
}
