import {PostType} from '@/lib/enums'
import Thumbnail from '@/components/thumbnail'
import { db } from '@/lib/db'

function Home({ data }: any) {
    return (
        <>
            {data.map((post: any) => (
                <div className="flex justify-start gap-3 my-2" key={post}>
                    <div className="shrink-0">
                        <Thumbnail data={post.videofile} type={post.post_type}/>
                    </div>
                    <div>
                        <a href={`/post/${encodeURIComponent(post.video_id)}`} className="text-lg font-semibold">
                            {post.title}
                        </a>
                        <p className="text-gray-500">{post.description}</p>
                        <p className="text-gray-400 text-sm">{PostType[post.post_type]}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export const getServerSideProps = async () => {
    const data = await db.videos.findMany({
        where: {
            flags: 0,
        },
        orderBy: {
            id: 'desc',
        }
    })
    return { props: { data } }
}

export default Home