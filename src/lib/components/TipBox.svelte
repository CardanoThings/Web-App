<script>
	import { Info, AlertTriangle, AlertCircle, CheckCircle, Lightbulb, Zap } from 'lucide-svelte';

	let { title = 'Tip', variant = 'info', icon = null, children } = $props();

	const variants = {
		info: {
			border: 'border-blue-500/30',
			bg: 'bg-blue-500/10',
			text: 'text-blue-300',
			defaultIcon: Info
		},
		warning: {
			border: 'border-yellow-500/30',
			bg: 'bg-yellow-500/10',
			text: 'text-yellow-300',
			defaultIcon: AlertTriangle
		},
		danger: {
			border: 'border-red-500/30',
			bg: 'bg-red-500/10',
			text: 'text-red-300',
			defaultIcon: AlertCircle
		},
		success: {
			border: 'border-green-500/30',
			bg: 'bg-green-500/10',
			text: 'text-green-300',
			defaultIcon: CheckCircle
		},
		purple: {
			border: 'border-purple-500/30',
			bg: 'bg-purple-500/10',
			text: 'text-purple-300',
			defaultIcon: Zap
		}
	};

	const currentVariant = variants[variant] || variants.info;
	const IconComponent = icon || currentVariant.defaultIcon;
</script>

<div class="mb-4 rounded-lg border p-4 {currentVariant.border} {currentVariant.bg}">
	<div class="flex gap-3">
		<div class="shrink-0">
			<IconComponent size={24} strokeWidth={1.5} class={currentVariant.text} />
		</div>
		<div class="flex-1">
			<p class="text-sm leading-relaxed font-medium {currentVariant.text}">
				<strong>{title}:</strong>
				{@render children()}
			</p>
		</div>
	</div>
</div>

<style>
	div :global(strong) {
		font-weight: 600;
	}

	div :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		font-family: 'Courier New', monospace;
	}
</style>
