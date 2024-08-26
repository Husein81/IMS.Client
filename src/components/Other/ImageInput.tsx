import { Upload } from "@mui/icons-material"
import { Box, Button, IconButton } from "@mui/material"
import { FC } from "react"

type Props = {
    setImages: (images: FileList | null) => void
    handleImageSubmit: () => void
    loadingUpload: boolean
}
const ImageInput:FC<Props> = ({ 
    setImages, 
    handleImageSubmit, 
    loadingUpload
}) => {
  return (
    <Box display={'flex'} gap={2} sx={{py:1}}>
        <IconButton component="label" sx={{ display: 'inline-block', border:1, borderRadius:1, borderColor:'#aeaeae' }}>
            <Box
                component={'input'}
                type="file" 
                accept="image/*" 
                hidden 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImages(e.target.files)} multiple />
            <Upload  fontSize="large"/>
        </IconButton>
        <Button variant="contained" color="secondary" sx={{color:'white'}} onClick={handleImageSubmit}>
            {loadingUpload ? 'Uploading...' : 'Upload'}
        </Button>
    </Box>
  )
}
export default ImageInput