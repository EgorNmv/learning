import { Router } from "express";
import * as multer from "multer";
import * as path from "path";
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../core/src/database-connection/database-connection";
import { UserEntity } from "../objects/entities/user/entity";
import { findUserById } from "../resolvers/user/queries/findUserById";
import { TrainingEntity } from "../objects/entities/training/entity";
import { findTrainingById } from "../resolvers/training/queries/findTrainingById";
import { CategoryEntity } from "../objects/entities/category/entity";
import { findCategoryById } from "../resolvers/category/queries/findCategoryById";
import { MaterialEntity } from "../objects/entities/material/entity";
import { findMaterialById } from "../resolvers/material/queries/findMaterialById";

const FILE_SIZE_LIMIT = 1024 * 1024 * 100;
const router: Router = Router();
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder: string = path.join(__dirname, "../../../../uploads/");

    try {
      switch (req.body.type) {
        /**
         * User img
         */
        case "0":
          uploadFolder += "user/";
          break;
        /**
         * Training img
         */
        case "1":
          uploadFolder += "training/";
          break;
        /**
         * Category img
         */
        case "2":
          uploadFolder += "category/";
          break;
        /**
         * Training material
         */
        case "3":
          uploadFolder += "material/";
      }
    } catch (e) {
      console.error("Ошибка при попытке загрузки файла", e);
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const extension: string = `.${file.originalname.split(".").pop()}`;

    cb(null, Date.now() + extension);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const typeOfFile: string = req.body.type;
  const availableImageFileExtensions: string[] = [
    "jpeg",
    "jpg",
    "gif",
    "png",
    "svg",
    "tiff",
    "bmp",
    "tif",
    "jfif",
  ];

  if (typeOfFile !== "3") {
    const extensionOfFile: string = file.originalname.split(".").pop();
    const isCurrentExtensionAreAllowed: boolean = availableImageFileExtensions.includes(
      extensionOfFile
    );

    isCurrentExtensionAreAllowed ? cb(null, true) : cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 1, fileSize: FILE_SIZE_LIMIT, fields: 10 },
});

export default router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const id: number = Number(req.body.id);
      const filename: string = req.file.filename;
      const connection: Connection = await getLocallyConnection();

      if (id) {
        switch (req.body.type) {
          case "0":
            const user: UserEntity = await findUserById(connection, id);
            const updatedUser: UserEntity = await connection
              .getRepository(UserEntity)
              .save({ ...user, photo: filename });

            res.status(201).json({ user: updatedUser });
            break;
          case "1":
            const training: TrainingEntity = await findTrainingById(
              connection,
              id
            );
            const updatedTraining: TrainingEntity = await connection
              .getRepository(TrainingEntity)
              .save({ ...training, label: filename });

            res.status(201).json({ training: updatedTraining });
            break;
          case "2":
            const category: CategoryEntity = await findCategoryById(
              connection,
              id
            );
            const updatedCategory: CategoryEntity = await connection
              .getRepository(CategoryEntity)
              .save({ ...category, label: filename });

            res.status(201).json({ category: updatedCategory });
            break;
          case "3":
            const material: MaterialEntity = await findMaterialById(
              connection,
              id
            );
            const updatedMaterial: MaterialEntity = await connection
              .getRepository(MaterialEntity)
              .save({ ...material, link: filename });

            res.status(201).json({ material: updatedMaterial });
        }
      } else {
        res.status(201).json({ filename });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);
