<script>
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let open = $state(false);

	let formData = $state({
		title: '',
		description: '',
		link: '',
		author: '',
		link_author: '',
		image: ''
	});

	function handleSubmit() {
		// Create email body with form data
		const emailBody = `New Project Submission for CardanoThings.io

Project Title: ${formData.title}
Description: ${formData.description}
Project Link: ${formData.link}
Author: ${formData.author}
Author Link: ${formData.link_author}
Image URL: ${formData.image}

---
Submitted via CardanoThings.io website`;

		// Create mailto link
		const mailtoLink = `mailto:projects@cardanothings.io?subject=New Project Submission: ${encodeURIComponent(formData.title)}&body=${encodeURIComponent(emailBody)}`;

		// Open email client
		window.location.href = mailtoLink;

		// Close dialog
		open = false;

		// Reset form
		formData = {
			title: '',
			description: '',
			link: '',
			author: '',
			link_author: '',
			image: ''
		};
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button
			class="mt-4 cursor-pointer bg-white text-xs text-black transition-all hover:bg-zinc-200"
		>
			Submit Your Project
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Submit Your Project</Dialog.Title>
			<Dialog.Description>
				Fill out the form below to submit your Cardano IoT project for consideration.
			</Dialog.Description>
		</Dialog.Header>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			class="space-y-4"
		>
			<div class="space-y-2">
				<label for="title" class="mb-1 block text-sm font-medium">Project Title *</label>
				<Input
					id="title"
					type="text"
					required
					bind:value={formData.title}
					placeholder="Your Project Title"
				/>
			</div>

			<div class="space-y-2">
				<label for="description" class="mb-1 block text-sm font-medium">Description *</label>
				<textarea
					id="description"
					required
					bind:value={formData.description}
					placeholder="Brief description of your project..."
					class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
					rows="3"
				></textarea>
			</div>

			<div class="space-y-2">
				<label for="link" class="mb-1 block text-sm font-medium">Project Link *</label>
				<Input
					id="link"
					type="url"
					required
					bind:value={formData.link}
					placeholder="https://github.com/username/project"
				/>
			</div>

			<div class="space-y-2">
				<label for="author" class="mb-1 block text-sm font-medium">Author Name *</label>
				<Input
					id="author"
					type="text"
					required
					bind:value={formData.author}
					placeholder="Your name or GitHub username"
				/>
			</div>

			<div class="space-y-2">
				<label for="link_author" class="mb-1 block text-sm font-medium">Author Link</label>
				<Input
					id="link_author"
					type="url"
					bind:value={formData.link_author}
					placeholder="https://github.com/username"
				/>
			</div>

			<div class="space-y-2">
				<label for="image" class="mb-1 block text-sm font-medium">Image URL</label>
				<Input
					id="image"
					type="url"
					bind:value={formData.image}
					placeholder="https://example.com/image.png"
				/>
			</div>

			<Dialog.Footer>
				<Dialog.Close>
					<Button
						variant="outline"
						size="sm"
						class="cursor-pointer bg-white text-xs text-black hover:bg-zinc-200"
					>
						Cancel
					</Button>
				</Dialog.Close>
				<Button
					type="submit"
					size="sm"
					class="cursor-pointer bg-black text-xs text-white hover:bg-zinc-800"
				>
					Submit via Email
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
