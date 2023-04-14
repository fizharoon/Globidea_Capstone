import { Link } from "react-router-dom";
import timelineImg1 from "../assets/timeline-img-1.png";
import timelineImg2 from "../assets/timeline-img-2.png";
import timelineImg3 from "../assets/timeline-img-3.png";
import timelineImg4 from "../assets/timeline-img-4.png";
import timelineImg5 from "../assets/timeline-img-5.png";

const Home = () => {
  return (
    <div>
      <h1>Welcome to our website!</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>


        <Link to="/phase1" style={{ transform: "skewX(-8deg)", perspective: "1000px", transformStyle: "preserve-3d", margin: "0 10px" }}title="Planning to Attend">
          <img src={timelineImg1} alt="timeline-img-1" style={{ width: "200px", height: "300px", transform: "skewX(8deg) rotateY(20deg)" }} />
        </Link>
        <Link to="/phase2" style={{ transform: "skewX(-8deg)", perspective: "1000px", transformStyle: "preserve-3d", margin: "0 10px" }}title="Getting Started">
          <img src={timelineImg2} alt="timeline-img-2" style={{ width: "200px", height: "300px", transform: "skewX(8deg) rotateY(-20deg)" }} />
        </Link>
        <Link to="/phase3" style={{ transform: "skewX(-8deg)", perspective: "1000px", transformStyle: "preserve-3d", margin: "0 10px" }}title="Making Progress">
          <img src={timelineImg3} alt="timeline-img-3" style={{ width: "200px", height: "300px", transform: "skewX(8deg) rotateY(20deg)" }} />
        </Link>
        <Link to="/phase4" style={{ transform: "skewX(-8deg)", perspective: "1000px", transformStyle: "preserve-3d", margin: "0 10px" }}title="Prepare to graduate">
          <img src={timelineImg4} alt="timeline-img-4" style={{ width: "200px", height: "300px", transform: "skewX(8deg) rotateY(-20deg)" }} />
        </Link>
        <Link to="/phase5" style={{ transform: "skewX(-8deg)", perspective: "1000px", transformStyle: "preserve-3d", margin: "0 10px" }}title="Moving Forward">
          <img src={timelineImg5} alt="timeline-img-5" style={{ width: "200px", height: "300px", transform: "skewX(8deg) rotateY(20deg)" }} />
        </Link>
      </div>
      <button>
        <Link to="/adminsignin">Admin signin</Link>
      </button>
    </div>
  );
};

export default Home;
