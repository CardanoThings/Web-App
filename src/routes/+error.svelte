<script>
	import { page } from '$app/stores';
</script>

<div class="error-container">
	<h1>Something went wrong</h1>
	<p>Status: {$page.status}</p>
	<p>Error: {$page.error?.message}</p>
</div>

<style>
	.error-container {
		padding: 2rem;
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	h1 {
		color: #e53e3e;
		margin-bottom: 1rem;
	}

	p {
		margin: 0.5rem 0;
		color: #666;
	}
</style>
