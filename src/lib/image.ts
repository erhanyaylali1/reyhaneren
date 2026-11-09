import { uploadImage } from "@/app/admin/actions";

// Shrinks a photo in the browser (a 6 MB phone photo → ~200–400 KB JPEG),
// then uploads it. Returns the public URL (Supabase Storage) or, in the
// local demo, a data URL. GIFs are uploaded untouched to keep animation.
export async function uploadImageFile(file: File, maxSize = 1600): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Lütfen bir görsel dosyası seçin.");
  const upload = file.type === "image/gif" ? file : await downscale(file, maxSize);
  const form = new FormData();
  form.append("file", upload);
  const result = await uploadImage(form);
  if ("error" in result) throw new Error(result.error);
  return result.url;
}

async function downscale(file: File, maxSize: number, quality = 0.82): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Görsel işlenemedi.");
  ctx.fillStyle = "#ffffff"; // flatten transparency for JPEG
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
  if (!blob) throw new Error("Görsel işlenemedi.");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}
