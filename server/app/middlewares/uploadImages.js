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
    req.uploadImages = result;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = uploadImages;
