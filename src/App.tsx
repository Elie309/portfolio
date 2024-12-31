import Navigation from './components/Navigation';
import Introduction from './components/Introduction';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import ContactMe from './components/ContactMe';

function App() {
  return (
    <>
      <header>
        <h1>My Portfolio</h1>
        <Navigation />
      </header>
      <Introduction />
      <AboutMe />
      <Projects />
      <ContactMe />
    </>
  )
}

export default App
