import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import fs from "fs"

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const path = "./uploads/images/"
    // create directory if not exists
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    callback(null, path)
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const ext = file.mimetype.split("/")[1]
    callback(null, `image-${Date.now()}.${ext}`)
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true)
  } else {
    callback(new Error("Not an image! Please upload an image."))
  }
}

const multerConfig = {
  config: {
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter,
  },
  keyUpload: "photo",
}

export default multerConfig