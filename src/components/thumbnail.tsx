import {PostType} from "@/lib/enums";

export default function Thumbnail({ data, type }: any) {
	if (type == PostType.Image) {
		return (
			<>
				<img src={'https://' + process.env.BUNNY_CDN_URL + '/' + data} className="thumbnail" alt="Thumbnail"></img>
			</>
		)
	}

	return (
		<>
			<img src="/thumbnail.png" className="thumbnail" alt="Thumbnail"></img>
		</>
	)
}