import { BunnyCdnStream } from 'bunnycdn-stream'
import VideoJS from '@/components/video.js'
import videojs from "video.js";
import {useEffect, useRef, useState} from "react";
import {PostType} from '@/lib/enums'
import {db} from "@/lib/db";
import moment from "moment";

function PostPage({ data, file }: any) {
	// should fix hydration bug i got once, -grkb 03/25/2023
	const [time, setTime] = useState('Sometime ago')
	useEffect(() => setTime(moment(data.time * 1000).fromNow()), [data.time])

	return (
		<>
			<div className="grid grid-cols-2 gap-3" key={data}>
				<div>
					<div>
						<PostAuthor author={data.author}/>
						<Post post_type={data.post_type} file={file}/>
						<h1 className="text-xl font-bold">{ data.title }</h1>
						<p className="text-gray-500">
							A number of views • { time }
						</p>
					</div>
				</div>
				<div>
					<h1>Placeholder</h1>
				</div>
			</div>
		</>
	)
}

function PostAuthor({ author }: any) {
	return (
		<>
			<div className="flex gap-1 items-center mb-2">
				<img src={ author.image } className="w-8 rounded-full" alt={ author.name }/>
				<div className="flex gap-1 items-baseline">
					<a href={ "/user/" + author.name }>{ author.name }</a>
					<p className="text-xs text-gray-400">1,337,420 followers</p>
				</div>
			</div>
		</>
	)
}

function Post({ post_type, file }: any) {
	const playerRef = useRef(null);
	if (post_type == PostType.Video) {

		const videoJsOptions = {
			autoplay: false,
			controls: true,
			responsive: true,
			fluid: true,
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
			</>
		)
	} else if (post_type == PostType.Image) {
		return (
			<>
				<img src={ file } className="w-full"/>
			</>
		)
	}
	return (
		<>
			<p>Unknown post type.</p>
		</>
	)
}

export const getServerSideProps = async (context: any) => {
	const data = await db.videos.findFirst({
		where: {
			video_id: context.query.pid,
		},
		include: {
			author: true,
		},
	})
	let file;

	if (!data) {
		return {
			notFound: true,
		}
	}

	if (data?.post_type == PostType.Video) {
		file = 'https://vz-05de22db-96d.b-cdn.net/a7dd915c-47aa-4ccc-adc2-2e62a7fcc473/playlist.m3u8'
	} else {
		file = 'https://' + process.env.BUNNY_CDN_URL + '/' + data?.videofile
	}

	return { props: { data, file } }
}
export default PostPage