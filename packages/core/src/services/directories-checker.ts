import * as fs from "fs";

export const checkIsUploadsFolderExists = () => {
  const uploadFolderPath: string = "../../uploads";
  const foldersInUpload: string[] = [
    "/category",
    "/training",
    "/material",
    "/report",
  ];

  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdir(uploadFolderPath, () => {
      console.info("created /uploads folder");
      foldersInUpload.forEach((name) =>
        fs.mkdir(uploadFolderPath.concat(name), () =>
          console.info(`created ${name} folder`)
        )
      );
    });
  }

  if (!fs.existsSync("./logs")) {
    fs.mkdir("./logs", () => {
      console.info("created /logs folder");
    });
  }
};
