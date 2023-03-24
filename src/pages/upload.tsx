import fs from 'fs';
import {PrismaClient} from "@prisma/client";
import {ChangeEvent, useState} from "react";

function Upload() {
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState<string | null>(null);

	const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target;

		if (!fileInput.files) {
			alert("No file was chosen");
			return;
		}

		if (!fileInput.files || fileInput.files.length === 0) {
			alert("Files list is empty");
			return;
		}

		const file = fileInput.files[0];
		setFile(file);
	}

	const onUploadFile = async (e: SubmitEvent) => {
		e.preventDefault();

		if (!file || !title) {
			return;
		}

		try {
			let formData = new FormData();
			formData.append("media", file);
			formData.append("title", title);

			const res = await fetch("http://localhost:3000/api/upload", {
				method: "POST",
				body: formData,
			});

			const {
				data,
				error,
			}: {
				data: {
					url: string | string[];
				} | null;
				error: string | null;
			} = await res.json();

			if (error || !data) {
				alert(error || "Sorry! something went wrong.");
				return;
			}

			console.log("File was uploaded successfully:", data);
		} catch (error) {
			console.error(error);
			alert(error || "Sorry! something went wrong.");
		}
	};

	return (
		<>
			<div className="bg-yellow-200 px-3 py-3 rounded-l mb-2">
				Uploading images is currently only supported.
			</div>
			<div className="bg-slate-50 border border-solid border-gray-200 p-5 rounded-l">
				<h1 className="font-semibold text-2xl">Upload</h1>
				<form className="grid grid-cols-1 gap-4 grid-flow-row" action="" encType='multipart/form-data'>
					<input type="text" id="title" name="title" placeholder="Title" className="input-text" onChange={e => setTitle(e.target.value)} />
					<input type="file" id="file" name="file" onChange={onFileUploadChange}/>
					<button className="button-primary justify-self-end" onClick={onUploadFile}>Upload</button>
				</form>
			</div>
		</>
	)
}

export async function getStaticProps(context: any) {
	return {
		props: {}, // will be passed to the page component as props
	}
}

export default Upload