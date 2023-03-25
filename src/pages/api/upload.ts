// this is based on https://codersteps.com/articles/how-to-build-a-file-uploader-with-next-js-and-formidable
// because i couldn't figure out this shit. -grkb 03/24/2023

import { parseForm, FormidableError } from "@/lib/parse-form";
import {NextApiRequest, NextApiResponse} from "next";
import { randomUUID } from 'crypto';
import {getSession} from "next-auth/react";
import {db} from "@/lib/db";

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<{
		data: {
			url: string | string[];
		} | null;
		error: string | null;
	}>
) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		res.status(405).json({
			data: null,
			error: "Method Not Allowed",
		});
		return;
	}
	try {
		const { fields, files } = await parseForm(req);

		const file = files.media;
		const title = files.title;
		let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.newFilename;

		const session = await getSession({ req })

		res.status(200).json({
			data: {
				url,
			},
			error: null,
		});

		const post = await db.videos.create({
			data: {
				video_id: randomUUID(),
				title: "Title",
				time: Math.floor(Date.now() / 1000),
				most_recent_view: Math.floor(Date.now() / 1000),
				views: 0,
				flags: 0,
				post_type: 2,
				videofile: file.newFilename,
				authorId: session?.user?.id,
			},
		})

	} catch (e) {
		if (e instanceof FormidableError) {
			res.status(e.httpCode || 400).json({data: null, error: e.message});
		} else {
			console.error(e);
			res.status(500).json({data: null, error: "Internal Server Error"});
		}
	}
}

export default handler