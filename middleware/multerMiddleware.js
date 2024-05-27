import multer from 'multer'

import path from 'path'
const rootDir = process.cwd()
const uploadDir = path.join(rootDir, 'public', 'uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored

    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
    // set the name of the uploaded file
    cb(null, fileName)
  },
})

console.log(rootDir)
const upload = multer({ storage })

export default upload
