import { HStack } from "@chakra-ui/react";

import { Suspense, lazy, useEffect } from "react";

import "./Topbar.css";

const ModelManagerTopbar = lazy(
  () => import("../model-manager/topbar/ModelManagerTopbar"),
);

export function Topbar() {
  useEffect(() => {
    // Ensure the "CivitAi Models" button is injected into the ComfyUI menu
    const injectButton = () => {
      const menu = document.querySelector(".comfy-menu");
      if (menu) {
        const separator = document.createElement("hr");
        separator.style.margin = "20px 0";
        separator.style.width = "100%";
        menu.append(separator);

        const civitAiButton = document.createElement("button");
        civitAiButton.textContent = "CivitAi Models";
        civitAiButton.className =
          "comfyui-button comfyui-menu-mobile-collapse primary";
        civitAiButton.style.margin = "10px";
        civitAiButton.onclick = () => {
          // Logic to open your models list or handle button click
          document
            .querySelector("#workspaceManagerPanel")
            ?.classList.toggle("show");
        };

        menu.append(civitAiButton);
      }
    };

    injectButton();
  }, []);

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
      id="workspaceManagerPanel"
      className="workspaceManagerPanel"
    >
      <Suspense fallback={<div style={{ width: "60px" }} />}>
        <ModelManagerTopbar />
      </Suspense>
    </HStack>
  );
}
