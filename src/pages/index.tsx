import {PrismaClient} from "@prisma/client";
import {PostType} from '@/lib/enums'

const prisma = new PrismaClient()

function Home({ data }: any) {
    return (
        <>
            {data.map((post: any) => (
                <div className="flex justify-start gap-3 my-2" key={post}>
                    <div className="shrink-0">
                        <img src={'https://qobo-grkb.b-cdn.net/' + post.videofile} className="h-48 rounded-lg" alt="Thumbnail"></img>
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
    const data = await prisma.videos.findMany({
        where: {
            flags: 0,
        },
    })
    return { props: { data } }
}

export default Home