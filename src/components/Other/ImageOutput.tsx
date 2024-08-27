/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FC } from "react";
import { ColorSet } from "../../Theme";

type Props = {
  colors: ColorSet;
  formData: any;
  handleRemoveImage: (url: string, i: number) => void;
};
const ImageOutput: FC<Props> = ({ colors, formData, handleRemoveImage }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url: string, i: number) => (
          <Box
            key={i}
            className="flex justify-between p-3 border rounded-md"
            width={150}
          >
            <Box
              component={"img"}
              src={url}
              alt="listing image"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <IconButton
              sx={{
                "&:hover": { bgcolor: "transparent" },
                height: "fit-content",
                color: colors.black[500],
              }}
              onClick={() => handleRemoveImage(url, i)}
            >
              <Cancel />
            </IconButton>
          </Box>
        ))}
    </Box>
  );
};
export default ImageOutput;
