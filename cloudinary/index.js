const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: "dionb6owj",
  api_key: "359962574119154",
  api_secret: "uZsA3gFiapxE6_SaLAUi03p0WFQ",
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SaveMoreProducts",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});
module.exports = {
  cloudinary,
  storage,
};
