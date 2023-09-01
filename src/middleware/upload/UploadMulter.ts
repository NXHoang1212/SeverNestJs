import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

// Cấu hình cloudinary
cloudinary.config({
    cloud_name: 'dxlvdrb52',
    api_key: '217919634414516',
    api_secret: 'I1PFuGbCo_iZeezOqcCzAcSNWNI',
});
console.log("🚀 ~ file: UploadMulter.ts ~ line 27 ~ cloudinary", cloudinary.config())

// Cấu hình multer
export const MulterConfig = {
    storage: diskStorage({
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(
                new BadRequestException('Only image files are allowed!'),
                false
            );
        }
        callback(null, true);
    },
};

// Cấu hình CloudinaryUploader với folder cụ thể
export const CloudinaryUploader = {
    upload: async (path: string) => {
        try {
            const result = await cloudinary.uploader.upload(path, { folder: 'product' });
            return result;
        } catch (error) {
            console.error("Cloudinary Error:", error);
            throw error;
        }
    }
};

