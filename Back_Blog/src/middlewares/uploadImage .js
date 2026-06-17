import multiparty from 'multiparty';
import fs from 'fs';

const uploadImage = (req, res, next) => {
  const form = new multiparty.Form();

  console.log(form)
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cargar la imagen' });
    }

    const imageFile = files.imageFile[0];

    if (!imageFile) {
      return next();
    }

    const imagePath = `uploads/${imageFile.originalFilename}`;
    fs.renameSync(imageFile.path, imagePath);

    req.imagePath = imagePath;
    next();
  });
};

export default uploadImage;