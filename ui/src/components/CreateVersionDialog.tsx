import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  userSettingsTable,
  workflowVersionsTable,
} from "../db-tables/WorkspaceDB";
import { useState, ChangeEvent, useContext } from "react";
import { app } from "../utils/comfyapp";
import { WorkspaceContext } from "../WorkspaceContext";
import CreateVersionLogin from "../versionHistory/CreateVresionLogin";

interface Props {
  workflowId: string;
  onClose: () => void;
}
export default function CreateVersionDialog({ workflowId, onClose }: Props) {
  const [newVersionName, setNewVersionName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { session } = useContext(WorkspaceContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewVersionName(event.target.value);
    submitError && setSubmitError("");
  };

  const onSubmit = async () => {
    const trimName = newVersionName.trim();
    setNewVersionName(trimName);
    const versionList =
      (await workflowVersionsTable?.listByWorkflowID(workflowId)) ?? [];
    if (versionList.some((version) => version.name === trimName)) {
      setSubmitError(
        "The name is duplicated, please modify it and submit again.",
      );
    } else {
      const graphJson = JSON.stringify(app.graph.serialize());
      await workflowVersionsTable?.add({
        name: newVersionName,
        workflowID: workflowId,
        createTime: Date.now(),
        json: graphJson,
      });
      onClose();
    }
  };
  if (!session?.shareKey) {
    return (
      <Modal isOpen={true} onClose={onClose} size={"xl"}>
        <ModalContent width={"90vw"}>
          <ModalBody>
            <CreateVersionLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  const domain = new URL(userSettingsTable!.settings!.cloudHost).hostname;
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Stack mb={5}>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>Create Version</p>
            <p style={{ color: "GrayText" }}>
              Saving to{" "}
              <a href={userSettingsTable?.settings?.cloudHost}> {domain}</a>
            </p>
          </Stack>
          <FormControl isInvalid={!!submitError}>
            <FormLabel>Name</FormLabel>
            <Input
              value={newVersionName}
              onChange={handleChange}
              autoFocus
              onKeyUp={(e) => {
                e.code === "Enter" &&
                  !submitError &&
                  newVersionName &&
                  onSubmit();
              }}
            />
            {submitError && <FormErrorMessage>{submitError}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={onSubmit}
            isDisabled={!newVersionName || !!submitError}
          >
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
