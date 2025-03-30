<script>
  // You can add any dynamic behavior or reactive variables here if needed
</script>

<style>
  /* Include all the CSS you had in your style.css file here */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  /* General styling for the page */
  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #333;
    color: white;
  }
  
  .logo a {
    color: white;
    text-decoration: none;
    font-size: 24px;
  }

  .menu {
    display: flex;
    list-style-type: none;
  }

  .menu li {
    margin: 0 15px;
  }

  .menu a {
    color: white;
    text-decoration: none;
  }

  .menu-btn {
    display: none;
  }

  /* Home Section */
  #home {
    text-align: center;
    padding: 100px 20px;
    background-color: #f4f4f4;
  }

  .home-content .text {
    margin-bottom: 20px;
  }

  .home-content button {
    padding: 10px 20px;
    background-color: #007BFF;
    border: none;
    color: white;
    cursor: pointer;
  }

  /* About Section */
  #about {
    padding: 50px 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }

  .about-details {
    display: flex;
    justify-content: space-between;
  }

  .about-details img {
    max-width: 100%;
    height: auto;
  }

  /* Skills Section */
  #skills {
    padding: 50px 20px;
    background-color: #f9f9f9;
  }

  /* Footer */
  footer {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 20px;
  }
</style>

<!-- HTML Markup -->

<!-- Scroll-to-top button -->
<div class="scroll-button">
  <a href="#home"><i class="fas fa-arrow-up"></i></a>
</div>

<!-- Navigation Menu -->
<nav>
  <div class="navbar">
    <div class="logo"><a href="#">Thomas Moh</a></div>
    <ul class="menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Projects</a></li>
      <li><a href="#services">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="media-icons">
      <a href="https://www.linkedin.com/in/thomas-moh-39ab27196/"><i class="fab fa-linkedin"></i></a>
      <a href="https://www.instagram.com/thomas.moh/"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
  <div class="menu-btn">
    <i class="fas fa-bars"></i>
  </div>
</nav>

<!-- Home Section -->
<section class="home" id="home">
  <div class="home-content">
    <div class="text">
      <div class="text-two">I'm Thomas Moh</div>
      <div class="text-three">Software Developer</div>
      <div class="text-four">Northwestern University Graduate</div>
    </div>
    <div class="button">
      <a href="/Thomas_Moh_SE_Resume.pdf" download="ThomasMoh_Resume">
        <button>Resume</button>
      </a>
      <button><a class="text" href="#contact">Contact</a></button>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="about" id="about">
  <div class="content">
    <div class="title"><span>About Me</span></div>
    <div class="about-details">
      <div class="left">
        <img src="./Images/about.jpg" alt="About Me">
      </div>
      <div class="right">
        <div class="topic">Designing Impactful Software</div>
        <p>I'm a graduate of Northwestern University with a major in Computer Science and a minor in Psychology. To see my projects and career progression, check out my Projects section and Resume!</p>
        <div class="button">
          <a href="/Thomas_Moh_SE_Resume.pdf" download="ThomasMoh_Resume">
            <button>Download Resume</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="skills" id="skills">
  <div class="content">
    <div class="title"><span>Projects</span></div>
    <div class="row">
      <div class="column">
        <figure>
          <img src="./Images/chess.JPG" style="width:100%">
          <figcaption>(2021) A 2-player rotating chess game developed using Unity. <a href="https://github.com/sosalover/Chess">LINK TO CODE</a></figcaption>
        </figure>
      </div>
      <!-- Repeat the above block for each project -->
    </div>
  </div>
</section>

<!-- Skills Section -->
<section class="services" id="services">
  <div class="content">
    <div class="title"><span>My Skills</span></div>
    <div class="boxes">
      <div class="box">
        <div class="icon"><i class="fas fa-desktop"></i></div>
        <div class="topic">Programming Languages</div>
        <p>Java, Python, C++, JavaScript, and more!</p>
      </div>
      <!-- Repeat the above block for each skill -->
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="contact" id="contact">
  <div class="content">
    <div class="title"><span>Contact Me</span></div>
    <div class="text">
      <div class="topic">Have An Opportunity?</div>
      <p>Feel free to reach out via email or connect with me on LinkedIn!</p>
      <a href="mailto:thomasmoh2023@u.northwestern.edu">thomasmoh2023@u.northwestern.edu</a>
      <div class="media-icons">
        <a href="https://www.linkedin.com/in/thomas-moh-39ab27196/"><i class="fab fa-linkedin"></i></a>
        <a href="https://mail.google.com/"><i class="fab fa-gmail"></i></a>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="text">
    <span>Created By Thomas Moh</span>
  </div>
</footer>


