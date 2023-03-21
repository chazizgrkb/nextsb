import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

function Home({ data }) {
    return (
        <>
            {data.map((post) => (
                <div className="row" key={post}>
                    <div className="col-4">
                        <img src="thumbnail.png" class="img-thumbnail" alt="Thumbnail"></img>
                    </div>
                    <div className="col-8">
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
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