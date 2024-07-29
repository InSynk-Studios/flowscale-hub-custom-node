import { HStack } from "@chakra-ui/react";

import { Suspense, lazy } from "react";

import "./Topbar.css";

const ModelManagerTopbar = lazy(
  () => import("../model-manager/topbar/ModelManagerTopbar"),
);

export function Topbar() {
  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
      id="workspaceManagerPanel"
      className="workspaceManagerPanel"
    >
      {/* <Button
          size={"sm"}
          aria-label="workspace folder"
          height={TOPBAR_BUTTON_HEIGHT + "px"}
          // backgroundColor={colorMode === "dark" ? "#333547" : undefined}
          onClick={() => setRoute("recentFlows")}
          px={2}
        >
          <HStack gap={1}>
            <IconFolder size={21} />
            <IconTriangleInvertedFilled size={8} />
          </HStack>
        </Button> */}
      <Suspense fallback={<div style={{ width: "60px" }} />}>
        <ModelManagerTopbar />
      </Suspense>
      {/* <TopbarNewWorkflowButton /> */}
      {/* <EditFlowName
          isDirty={isDirty}
          displayName={curFlowName ?? ""}
          updateFlowName={(newName) => {
            setCurFlowName(newName);
            requestAnimationFrame(() => {
              updatePanelPosition();
            });
          }}
        /> */}
      {/* {workflowsTable?.curWorkflow?.saveLock && (
          <IconLock color="#FFF" size={20} />
        )} */}
      {/* {curFlowID && (
          <HStack gap={"4px"}>
            <Tooltip label="Open gallery">
              <IconButton
                onClick={() => setRoute("gallery")}
                icon={<IconPhoto size={22} color="white" />}
                size={"sm"}
                aria-label="open gallery"
                variant={"ghost"}
              />
            </Tooltip>
            <DropdownTitle />
          </HStack>
        )} */}
      {/* {curFlowID && isDirty ? (
          <Tooltip label="Save workflow">
            <IconButton
              onClick={() => saveCurWorkflow()}
              icon={<IconDeviceFloppy size={23} color="white" />}
              size={"xs"}
              paddingY={4}
              aria-label="save workspace"
              variant={"ghost"}
            />
          </Tooltip>
        ) : (
          <div style={{ width: 1 }} />
        )} */}
      {/* <VersionNameTopbar />
        <AppIsDirtyEventListener />
        <IconGripVertical
          id="dragPanelIcon"
          className="dragPanelIcon"
          cursor="move"
          size={15}
          color="#FFF"
        />
        {route === "spotlightSearch" && <SpotlightSearch />} */}
    </HStack>
  );
}
