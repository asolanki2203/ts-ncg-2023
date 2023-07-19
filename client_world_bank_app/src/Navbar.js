import { Link } from "react-router-dom/dist";

const Navbar= ({pageName})=>{
    return (
        <nav>
            <div className="navbar-container">
                <h1>{pageName}</h1>
                <Link className="btn" to={pageName === "Add View"? "/":"/add_view"}>{pageName === "Add View"? "All Views":"Add View"}</Link>
            </div>
        </nav>
    )
}

export default Navbar;