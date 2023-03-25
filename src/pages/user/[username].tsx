import {db} from "@/lib/db";

function Profile({ data }: any) {
	return (
		<>
			<div className="flex gap-3 my-2">
				<div className="w-56">
					<img src={ data.image } alt={ data.username } className="rounded-full"/>
					<h1 className="font-semibold text-2xl">{ data.name }</h1>
					<p className="text-gray-500 text-sm">{ data.id }</p>
				</div>
				<div className="flex-grow">
					<p>Placeholder</p>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = async (context: any) => {
	const data = await db.user.findFirst({
		where: {
			name: context.query.username,
		},
	})

	if (!data) {
		return {
			notFound: true,
		}
	}

	return { props: { data } }
}

export default Profile