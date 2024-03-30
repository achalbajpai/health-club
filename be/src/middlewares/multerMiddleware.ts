import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.memoryStorage();

export const upload = multer({ storage: storage });
