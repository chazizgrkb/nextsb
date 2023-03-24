// prototypical stuff for now. -grkb 03/23/2023
export default function Button({link, children}: any) {
	return (
		<>
			<a href={ link } className="button-primary">{ children }</a>
		</>
	)
}