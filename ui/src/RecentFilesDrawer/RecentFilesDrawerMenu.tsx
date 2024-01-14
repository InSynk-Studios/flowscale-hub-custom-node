import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import {
  IconMenu2,
  IconMoon,
  IconSettings,
  IconSun,
  IconTag,
} from "@tabler/icons-react";
import ManageTagsModal from "./ManageTagsModal";
import { useState } from "react";
import WorkspaceSettingsModal from "./WorkspaceSettingsModal";
const ICON_SIZE = 16;
type Props = {
  //   onclose: () => void;
};
export default function RecentFilesDrawerMenu({}: Props) {
  const [isManageTagsOpen, setIsManageTagsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<IconMenu2 />}
          size={"sm"}
          variant="outline"
        />
        <MenuList>
          <MenuItem
            onClick={() => setIsSettingsOpen(true)}
            icon={<IconSettings size={16} />}
            fontSize={16}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => setIsManageTagsOpen(true)}
            icon={<IconTag size={ICON_SIZE} />}
            fontSize={16}
          >
            Manage Tags
          </MenuItem>
          <MenuItem
            onClick={toggleColorMode}
            icon={
              colorMode === "light" ? (
                <IconMoon size={ICON_SIZE} />
              ) : (
                <IconSun size={ICON_SIZE} />
              )
            }
            fontSize={16}
          >
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </MenuItem>
        </MenuList>
      </Menu>
      {isManageTagsOpen && (
        <ManageTagsModal onclose={() => setIsManageTagsOpen(false)} />
      )}
      {isSettingsOpen && (
        <WorkspaceSettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
}
