import { useRouter } from 'next/router'
import {PrismaClient} from "@prisma/client"
import { BunnyCdnStream } from 'bunnycdn-stream'
import VideoJS from '../../components/video.js'
import videojs from "video.js";
import {useRef} from "react";

const prisma = new PrismaClient()
function Post({ data, file }: any) {
	const playerRef = useRef(null);

	const videoJsOptions = {
		autoplay: false,
		controls: true,
		responsive: false,
		fluid: false,
		sources: [{
			src: file,
			type: 'application/x-mpegURL'
		}]
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			videojs.log('player is waiting');
		});

		player.on('dispose', () => {
			videojs.log('player will dispose');
		});
	};

	return (
		<>
			<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
			<h1 className="text-xl font-bold">{ data.title }</h1>
		</>
	)
}

export const getServerSideProps = async (context) => {
	//const stream = new BunnyCdnStream({ videoLibrary: 'ID', apiKey: 'API'})
	//const video = await stream.getVideo("a7dd915c-47aa-4ccc-adc2-2e62a7fcc473")

	const file = 'https://vz-05de22db-96d.b-cdn.net/a7dd915c-47aa-4ccc-adc2-2e62a7fcc473/playlist.m3u8'

	const data = await prisma.videos.findFirst({
		where: {
			video_id: context.query.pid,
		},
	})
	return { props: { data, file } }
}
export default Post