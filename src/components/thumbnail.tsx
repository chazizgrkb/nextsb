import {PostType} from "@/lib/enums";

export default function Thumbnail({ data, type }: any) {
	if (type == PostType.Video) {
		return (
			<>
				<img src="/thumbnail.png" className="thumbnail" alt="Thumbnail"></img>
			</>
		)
	} else if (type == PostType.Image) {
		return (
			<>
				<img src={'https://qobo-grkb.b-cdn.net/' + data} className="thumbnail" alt="Thumbnail"></img>
			</>
		)
	}
}