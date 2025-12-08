<script>
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
</script>

<section class="mb-16 flex flex-col gap-8 text-white">
	<h1 class="text-4xl font-medium">Live Code Card Test</h1>
	<p class="text-lg font-thin text-white">
		This page tests the LiveCodeCard component that fetches code and README files directly from
		GitHub repositories.
	</p>

	<div class="flex flex-col gap-8">
		<!-- Test 1: Simple blink code example (single file) -->
		<LiveCodeCard
			title="Blink Code Example"
			repo="CardanoThings/Workshops"
			files={[
				{
					path: 'Workshop-01/examples/blink-code/blink-code.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-01/examples/blink-code/README.md"
			branch="main"
		/>

		<!-- Test 2: Multiple files with tabs (CardanoTicker screens) -->
		<LiveCodeCard
			title="CardanoTicker Screen Components"
			repo="CardanoThings/Workshops"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/wallet_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/token_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/nft_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/status_screen.cpp',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/README.md"
			branch="main"
		/>

		<!-- Test 3: Multiple files with headers -->
		<LiveCodeCard
			title="CardanoTicker Core Files"
			repo="CardanoThings/Workshops"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/CardanoTicker.ino',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/config.h',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/config.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/data_fetcher.h',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/data_fetcher.cpp',
					language: 'cpp'
				}
			]}
			branch="main"
		/>
	</div>
</section>
