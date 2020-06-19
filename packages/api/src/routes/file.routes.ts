import { Router } from "express";
import multer = require("multer");
import { Connection } from "typeorm";
import { getLocallyConnection } from "../../../core/src/database-connection/database-connection";
import { UserEntity } from "../objects/entities/user/entity";
import { findUserById } from "../resolvers/user/queries/findUserById";
import { TrainingEntity } from "../objects/entities/training/entity";
import { findTrainingById } from "../resolvers/training/queries/findTrainingById";
import { CategoryEntity } from "../objects/entities/category/entity";
import { findCategoryById } from "../resolvers/category/queries/findCategoryById";


const router: Router = Router();
const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadFolder: string = "../../../uploads/";

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
                    uploadFolder += "training/"
                    break;
                /**
                 * Category img
                 */
                case "2":
                    uploadFolder += "category/"
                    break;
            }
        } catch (e) {
            console.error("Ошибка при попытке загрузки файла", e);
        }

        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const extension: string = `.${file.originalname.split(".").pop()}`;

        cb(null, Date.now() + extension);
    }
});
const upload = multer({ storage });

export default router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const id: number = Number(req.body.id);
        const filename: string = req.file.filename;
        const connection: Connection = await getLocallyConnection();

        if (id) {
            switch (req.body.type) {
                case "0":
                    const user: UserEntity = await findUserById(connection, id);
                    const updatedUser: UserEntity = await connection
                        .getRepository(UserEntity).save({ ...user, photo: filename });

                    res.status(201).json({ user: updatedUser });
                    break;
                case "1":
                    const training: TrainingEntity = await findTrainingById(connection, id);
                    const updatedTraining: TrainingEntity = await connection
                        .getRepository(TrainingEntity).save({ ...training, label: filename });

                    res.status(201).json({ training: updatedTraining });
                    break;
                case "2":
                    const category: CategoryEntity = await findCategoryById(connection, id);
                    const updatedCategory: CategoryEntity = await connection
                        .getRepository(CategoryEntity).save({ ...category, label: filename });

                    res.status(201).json({ category: updatedCategory });
                    break;
            }
        } else {
            res.status(201).json({ filename });
        }
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
    }
});