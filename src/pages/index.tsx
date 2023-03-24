import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

function Home({ data }: any) {
    return (
        <>
            <div className="bg-cover bg-pink-700 p-8 rounded-lg text-center">
                <h1 className="text-5xl font-extrabold text-white">Welcome to the Qobo prototype.</h1>
                <p className="text-white mt-3">Please note that not all of the functionality present in openSB is implemented.</p>
            </div>
            {data.map((post: any) => (
                <div className="flex justify-start gap-3 my-2" key={post}>
                    <div>
                        <img src="thumbnail.png" className="h-48 rounded-lg" alt="Thumbnail"></img>
                    </div>
                    <div>
                        <a href={`/post/${encodeURIComponent(post.video_id)}`} className="text-lg font-semibold">
                            {post.title}
                        </a>
                        <p className="text-gray-500">{post.description}</p>
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