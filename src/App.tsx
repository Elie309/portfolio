

function App() {
  return (
    <>
      <header>
        <h1>My Portfolio</h1>
      </header>
      <section id="about">
        <h2 className="text-green-600">About Me</h2>
        <p>
          Hello, I'm a developer with experience in building web applications.
        </p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <ul>
          <li>Project 1: Description of project 1</li>
          <li>Project 2: Description of project 2</li>
          <li>Project 3: Description of project 3</li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>
          You can reach me at <a href="mailto:developer@example.com">developer@example.com</a>
        </p>
      </section>
    </>
  )
}

export default App
