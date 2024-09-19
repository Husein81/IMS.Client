/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../../fire";

const storeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          resolve(downloadUrl)
        );
      }
    );
  });
};

export const handleImageSubmit = (
  images: FileList,
  formData: any,
  setLoadingUpload: any,
  setFormData: any
) => {
  const newImage = images as FileList;
  if (newImage.length > 0 && newImage.length + formData.imageUrls.length < 7) {
    setLoadingUpload(true);
    const promises: Promise<string>[] = [];
    for (let i = 0; i < newImage.length; i++) {
      promises.push(storeImage(newImage.item(i) as File));
    }
    Promise.all(promises)
      .then((urls: any) =>
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        })
      )
      .then(() => setLoadingUpload(false))
      .catch(() => {
        setLoadingUpload(false);
        console.log("Image upload failed (2 mb max per image)");
      });
  } else {
    setLoadingUpload(false);
    console.log("You can only upload 6 images per listing");
  }
};

export const handleRemoveImage = (
  url: string,
  index: number,
  formData: any,
  setFormData: any
) => {
  const imageName = url.split("/")[7].split("?")[0];
  const storage = getStorage(app);
  const storageRef = ref(storage, imageName);
  deleteObject(storageRef).catch(() =>
    console.log("Unable to delete the image")
  );
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_: any, i: number) => i !== index),
  });
};
