import { Link } from "react-router-dom";

const Home = () => {
    
    const isLoggedIn = (localStorage.getItem('jwtToken'))? true : false;;

    return ( 
        <div className="Home">
            {console.log(localStorage.getItem('jwtToken'))}
            <p>This is Home.</p>
            {!isLoggedIn && 
        <Link to="/auth/login">Login</Link>
      }
            <br />
            <Link to="/protected">Protected</Link>
        </div>
     );
}
 
export default Home;