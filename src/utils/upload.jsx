import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";
import { toast } from "react-toastify";

// dosyayi storage'a yükleyen foksiyon
const upload = async (file) => {
  // 1) dosya resim degilse fonksiyonu durdur
  // 2)dosya ismi image kelimesi ile baslamiyorsa kontrolu yapma
  if (!file?.type.startsWith("image") || !file) return null;

  // 2) dosyanin yüklenicegi konumun referansini al
  const imageRef = ref(storage, v4() + file.name);

  try {
    // 3) referansini aldigimiz konuma dosyayi yükle
    await uploadBytes(imageRef, file);

    // 4) yüklenen dosyanin url'ini al ve return et
    return await getDownloadURL(imageRef);
  } catch (err) {
    toast.error("An error occurred while uploading the image");
  }
};

export default upload;
