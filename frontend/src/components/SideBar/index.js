import { useHistory } from 'react-router-dom'
import './SideBar.scss'

const SideBar = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  }

  return (
  <div id="about-bar">
      <a onClick={goHome}>Home</a>
      <p className="category">About Me Links</p>
      <div id="about-links">
        <a href="https://github.com/lofiwatercat">Github</a>
        <a href="https://www.linkedin.com/in/alan-tran-kiem-971210252/">Linked In</a>
        <a href="https://angel.co/u/alan-tran-kiem">Angel List</a>
      </div>
  </div>
  ) 
}

export default SideBar;
