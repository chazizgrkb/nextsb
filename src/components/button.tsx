// prototypical stuff for now. -grkb 03/23/2023
export default function Button({link, children}: any) {
	return (
		<>
			<a href={ link } className="bg-pink-500 hover:bg-pink-700 px-5 py-1.5 text-sm font-semibold text-white rounded-md">{ children }</a>
		</>
	)
}