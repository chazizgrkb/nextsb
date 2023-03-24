import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import BunnyStorage from "bunnycdn-storage";
import crypto from "crypto";
import fs from "fs";

export const FormidableError = formidable.errors.FormidableError;

const bunnyCDN = new BunnyStorage(process.env.BUNNY_CDN_API, process.env.BUNNY_CDN_ZONE, process.env.BUNNY_CDN_REGION)

export const parseForm = async (
	req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
	return new Promise(async (resolve, reject) => {
		const uploadDir = join(
			process.env.ROOT_DIR || process.cwd(),
			`/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
		);

		try {
			await stat(uploadDir);
		} catch (e: any) {
			if (e.code === "ENOENT") {
				await mkdir(uploadDir, { recursive: true });
			} else {
				console.error(e);
				reject(e);
				return;
			}
		}

		const form = formidable({
			maxFiles: 1,
			maxFileSize: 50 * 1024 * 1024, // 50-ish mb?
			uploadDir,
			filename: (_name, _ext, part) => {
				const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
				const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
					mime.getExtension(part.mimetype || "") || "unknown"
				}`;
				return filename;
			},
			filter: (part) => {
				return (
					part.name === "media" && (part.mimetype?.includes("image") || false)
				);
			},
		});

		form.parse(req, async function (err, fields, files) {
			if (err) {
				reject(err);
			} else {
				console.log(files);
				await bunnyCDN.upload(files.media.filepath);
				fs.unlinkSync(files.media.filepath)
				resolve({fields, files});
			}
		});
	});
};