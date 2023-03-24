import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

function Home({ data }) {
    return (
        <>
            {data.map((post) => (
                <div className="grid grid-cols-1" key={post}>
                    <div className="flex gap-4 py-2">
                        <img src="thumbnail.png" className="h-48 rounded-lg" alt="Thumbnail"></img>
                        <div>
                        <a href={`/post/${encodeURIComponent(post.video_id)}`} className="text-lg font-semibold">
                            {post.title}
                        </a>
                        <p className="text-gray-500">{post.description}</p>
                        </div>
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