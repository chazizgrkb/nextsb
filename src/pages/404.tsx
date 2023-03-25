import Button from "@/components/button";

export default function Error404() {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
			<main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="font-semibold text-4xl">404</p>
					<h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">Page not found</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button link="/">Go home</Button>
					</div>
				</div>
			</main>
		</>
	)
}