import pump from 'pump';
import errorCodes from 'constants/errorCodes';

export async function uploadImage(req, res) {
  req.multipart(handler, done);

  const uploadStream = this.cloudinary.uploader.upload_stream(
    (error, result) => {
      if (error) {
        res.status(422).send({ error: errorCodes.UPLOAD_FAILED });
        return;
      }

      if (!result.format) {
        this.cloudinary.uploader.destroy(result.public_id);

        res.status(422).send({ error: errorCodes.INVALID_MEDIA_FORMAT });
        return;
      }

      console.log('upload completed');

      res.send(result.secure_url);
    },
  );

  function handler(field, file) {
    if (field !== 'image') {
      res.status(422).send({ error: errorCodes.NO_IMAGE_FIELD });
      return;
    }

    pump(file, uploadStream);
  }

  function done(err) {
    if (err) {
      res.status(422).send({ error: errorCodes.UPLOAD_FAILED });
      return;
    }

    console.log('read file completed');
  }
}
