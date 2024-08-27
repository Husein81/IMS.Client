import { Box, Modal, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/Store";
import { closeModal } from "../../app/redux/Slice/modalSlice";
import { token } from "../../Theme";
const ModalContainer = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const dispatch = useDispatch();
  const { open, body } = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Box
        width={"100%"}
        maxWidth={450}
        bgcolor={colors.white[500]}
        sx={{
          borderRadius: 2,
          padding: 2,
          boxShadow: 2,
        }}
      >
        {body}
      </Box>
    </Modal>
  );
};
export default ModalContainer;
