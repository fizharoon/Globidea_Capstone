import { Link } from "react-router-dom";
import timelineImg1 from "../assets/timeline-img-1.png";
import timelineImg2 from "../assets/timeline-img-2.png";
import timelineImg3 from "../assets/timeline-img-3.png";
import timelineImg4 from "../assets/timeline-img-4.png";
import timelineImg5 from "../assets/timeline-img-5.png";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to our website!</h1>
      <div className="timeline-container">
        <Link to="/phase1" className="timeline-item" title="Planning to Attend">
          <div className="timeline-item-content">
            <img src={timelineImg1} alt="timeline-img-1" />
            <h2>Planning to Attend</h2>
          </div>
        </Link>
        <Link to="/phase2" className="timeline-item" title="Getting Started">
          <div className="timeline-item-content">
            <img src={timelineImg2} alt="timeline-img-2" />
            <h2>Getting Started</h2>
          </div>
        </Link>
        <Link to="/phase3" className="timeline-item" title="Making Progress">
          <div className="timeline-item-content">
            <img src={timelineImg3} alt="timeline-img-3" />
            <h2>Making Progress</h2>
          </div>
        </Link>
        <Link to="/phase4" className="timeline-item" title="Prepare to graduate">
          <div className="timeline-item-content">
            <img src={timelineImg4} alt="timeline-img-4" />
            <h2>Prepare to graduate</h2>
          </div>
        </Link>
        <Link to="/phase5" className="timeline-item" title="Moving Forward">
          <div className="timeline-item-content">
            <img src={timelineImg5} alt="timeline-img-5" />
            <h2>Moving Forward</h2>
          </div>
        </Link>
      </div>
      {/* <button>
        <Link to="/adminsignin">Admin signin</Link>
      </button> */}
    </div>
  );
};

export default Home;
