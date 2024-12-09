export const getFileInfo = (file: Express.Multer.File) => {
  return {
    originalName: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    size: file.size,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
    buffer: file.buffer,
  };
}