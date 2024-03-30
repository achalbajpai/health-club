import admin from "firebase-admin";
import { Storage, getStorage } from "firebase-admin/storage";
import serviceAccount from "../../service-key.json";
import { cert } from "firebase-admin/app";

export const fapp: admin.app.App = admin.initializeApp({
  credential: cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.BUCKET_PATH,
});

const fstorage: Storage = getStorage();
export const bucket = fstorage.bucket();
