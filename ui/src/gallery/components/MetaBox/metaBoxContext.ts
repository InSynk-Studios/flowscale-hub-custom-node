import { createContext } from "react";
import { TopFieldType } from "./MetaBox.tsx";
import { PromptNodeInputItem } from "./utils.ts";

interface MetaBoxContextProps {
  topFields: TopFieldType[];
  updateTopField?: (field: TopFieldType) => void;
  calcInputList: PromptNodeInputItem[];
  showNodeName: boolean;
}

export const MetaBoxContext = createContext<MetaBoxContextProps>({
  topFields: [],
  calcInputList: [],
  showNodeName: false,
  updateTopField(): void {},
});
