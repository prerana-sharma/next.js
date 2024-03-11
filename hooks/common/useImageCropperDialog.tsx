import { createRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import CropperComponent from "../../components/cropper";
import { Button, Dialog, Group, Modal, Stack, Text } from "@mantine/core";

const ImageCropperDialog = ({
  openDialog,
  handleDialogClose,
  imageUrl,
  handleCroppedData,
}) => {
  const [image, setImage] = useState(imageUrl);
  const onSaveCropped = async (blob) => {
    handleCroppedData(blob);
    handleDialogClose();
  };

  return (
    <Modal
      className="image-crop-modal"
      opened={openDialog}
      onClose={handleDialogClose}
      size="lg"
      title="Crop Image"
    >
      {openDialog && (
        <>
          <Group>
            <Stack>
              <Stack style={{ width: "100%" }}>
                <CropperComponent
                  imageUrl={imageUrl}
                  onSaveCropped={onSaveCropped}
                />
              </Stack>
              <Stack>
                <Button size="lg" onClick={handleDialogClose}>
                  <span>Close</span>
                </Button>
              </Stack>
            </Stack>
          </Group>
        </>
      )}
    </Modal>
  );
};

export default ImageCropperDialog;
