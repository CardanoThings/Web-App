<script>
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<h1 class="mb-4">Introduction to Node.js</h1>

<p class="mb-4">
	Node.js is an open-source, cross-platform JavaScript runtime environment that enables developers
	to build scalable, high-performance server-side applications using JavaScript.
</p>

<section class="mb-4">
	<h2>History of Node.js</h2>

	<p>
		Node.js was first released in 2009 by Ryan Dahl as a way to create network servers and tools.
		Initially, it was designed for building real-time web applications, but over time its use cases
		have expanded to include mobile app development, desktop apps, and even machine learning and
		artificial intelligence.
	</p>
</section>

<section class="mb-4">
	<h2>What is Node.js?</h2>

	<p>
		Node.js is not just a programming language, but an entire platform that allows developers to:
	</p>

	<ul>
		<li>
			<strong>Run JavaScript on the server-side:</strong> Node.js enables you to run JavaScript on the
			server-side, making it possible to create scalable web applications.
		</li>
		<li>
			<strong>Build network servers and tools:</strong> Node.js provides a set of APIs and modules for
			building network servers, tools, and other applications.
		</li>
	</ul>
</section>

<section class="mb-4">
	<h2>Key Features</h2>

	<ul>
		<li>
			<strong>Event-driven I/O:</strong> Node.js uses an event-driven approach to handle input/output
			operations, making it highly efficient.
		</li>
		<li>
			<strong>Non-blocking I/O:</strong> Node.js supports non-blocking I/O operations, allowing for high
			concurrency and scalability.
		</li>
		<li>
			<strong>Large ecosystem:</strong> Node.js has a vast collection of packages (npm) that make it
			easy to build and integrate various features into your application.
		</li>
		<li>
			<strong>Cross-platform compatibility:</strong> Node.js can run on multiple platforms, including
			Windows, macOS, Linux, and even mobile devices.
		</li>
		<li>
			<strong>Built-in support for JSON:</strong> Node.js has built-in support for JSON, making it easy
			to work with data in a structured format.
		</li>
		<li>
			<strong>Microservices architecture:</strong> Node.js is often used in microservices architectures,
			allowing developers to build small, independent services that can be easily deployed and scaled.
		</li>
	</ul>
</section>

<section class="mb-4">
	<Card.Root>
		<Card.Header class="p-4 pb-0">
			<Card.Title class="text-lg">Getting started</Card.Title>
			<Card.Description class="mb-0 p-0">
				To get started with Node.js, follow these steps:
			</Card.Description>
		</Card.Header>
		<Card.Content class="p-4">
			<ol>
				<li class="mb-2">
					Install Node.js:
					<ul>
						<li>
							<a
								href="https://nodejs.org/en/download/"
								target="_blank"
								rel="noopener noreferrer"
								class="link">Download Node.js</a
							>
						</li>
					</ul>
				</li>
				<li class="mb-2">
					Create a new project:
					<pre class="rounded bg-gray-100 p-2">mkdir my-node-app &amp;&amp; cd my-node-app</pre>
				</li>
				<li class="mb-2">
					Initialize npm:
					<pre class="rounded bg-gray-100 p-2">npm init -y</pre>
				</li>
				<li class="mb-2">
					Create an entry point file (e.g., <code>index.js</code>) and start coding!
				</li>
			</ol>
		</Card.Content>
	</Card.Root>
</section>

<section class="mt-8">
	<h2 class="text-lg">Further Resources</h2>
	<ul>
		<li>
			<a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" class="link"
				>Node.js Official Website</a
			>
		</li>
		<li>
			<a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer" class="link"
				>npm - Node Package Manager</a
			>
		</li>
		<li>
			<a
				href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs"
				target="_blank"
				rel="noopener noreferrer"
				class="link">MDN Web Docs - Node.js</a
			>
		</li>
	</ul>
</section>
