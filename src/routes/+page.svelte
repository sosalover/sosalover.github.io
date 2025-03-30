<script>
	import Layout from '../layouts/Layout.svelte';
</script>

<!-- HTML Markup -->

<!-- Scroll-to-top button -->
<div class="scroll-button">
	<a href="#home"><i class="fas fa-arrow-up"></i></a>
</div>

<!-- Navigation Menu -->

<!-- Home Section -->
<Layout>
	<section id="home">
		<div>
			<div>
				<div>I'm Thomas Moh</div>
				<div>Software Developer</div>
				<div>Northwestern University Graduate</div>
			</div>
			<div>
				<a href="/Thomas_Moh_SE_Resume.pdf" download="ThomasMoh_Resume">
					<button>Resume</button>
				</a>
				<button><text>Contact</text></button>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about">
		<div>
			<div><span>About Me</span></div>
			<div>
				<div>
					<img src="./Images/about.jpg" alt="About Me" />
				</div>
				<div>
					<div>Designing Impactful Software</div>
					<p>
						I'm a graduate of Northwestern University with a major in Computer Science and a minor
						in Psychology. To see my projects and career progression, check out my Projects section
						and Resume!
					</p>
					<div>
						<a href="/Thomas_Moh_SE_Resume.pdf" download="ThomasMoh_Resume">
							<button>Download Resume</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section id="skills">
		<div>
			<div><span>Projects</span></div>
			<div>
				<div>
					<figure>
						<img src="./Images/chess.JPG" style="width:100%" />
						<figcaption>
							(2021) A 2-player rotating chess game developed using Unity. <a
								href="https://github.com/sosalover/Chess">LINK TO CODE</a
							>
						</figcaption>
					</figure>
				</div>
				<!-- Repeat the above block for each project -->
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section id="services">
		<div>
			<div><span>My Skills</span></div>
			<div>
				<div>
					<div><i></i></div>
					<div>Programming Languages</div>
					<p>Java, Python, C++, JavaScript, and more!</p>
				</div>
				<!-- Repeat the above block for each skill -->
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact">
		<div>
			<div><span>Contact Me</span></div>
			<div>
				<div>Have An Opportunity?</div>
				<p>Feel free to reach out via email or connect with me on LinkedIn!</p>
				<a href="mailto:thomasmoh2023@u.northwestern.edu">thomasmoh2023@u.northwestern.edu</a>
				<div class="media-icons">
					<a href="https://www.linkedin.com/in/thomas-moh-39ab27196/"><i></i></a>
					<a href="https://mail.google.com/"><i></i></a>
				</div>
			</div>
		</div>
	</section>
</Layout>

<style>
</style>
