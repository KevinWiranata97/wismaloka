const { imageKit } = require("../middlewares/multer");

async function uploadImages(req, res, next) {
  try {
    let result = [];

    for (let i = 0; i < req.files.length; i++) {
      let { buffer, originalname } = req.files[i];
      const url = await imageKit(buffer, originalname);
      let temp = {
        houseId: null,
        image: url.data.url,
      };
      result.push(temp);
    }
    if (result.length === 0) {
      throw {
        name: "Required",
        message: "image is required",
      };
    }
    req.uploadImages = result;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = uploadImages;
