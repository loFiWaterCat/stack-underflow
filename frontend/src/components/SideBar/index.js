import { useHistory } from 'react-router-dom'
import './SideBar.scss'

const SideBar = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  }

  return (
  <div id="side-bar">
      <a id="side-home" className="category" onClick={goHome}>Home</a>
      <div id="about-links">
        <p className="category">About Me Links</p>
        <a className="about-link" href="https://github.com/lofiwatercat">Github</a>
        <a className="about-link" href="https://www.linkedin.com/in/alan-tran-kiem-971210252/">Linked In</a>
        <a className="about-link" href="https://angel.co/u/alan-tran-kiem">Angel List</a>
      </div>
  </div>
  ) 
}

export default SideBar;
