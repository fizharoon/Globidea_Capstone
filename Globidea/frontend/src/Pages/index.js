import { Link } from "react-router-dom";

const Home = () => {
    return (   
      <div>
      <h1>Welcome to our website!</h1>
      <button>
      <Link to="/adminsignin">Admin signin</Link>
      </button>
      </div> 
    );
  };
  
  export default Home;