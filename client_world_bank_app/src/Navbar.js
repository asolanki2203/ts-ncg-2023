const Navbar= ({pageName})=>{
    return (
        <nav>
            <div className="navbar-container">
                <h1>{pageName}</h1>
                <button className="btn">Add View</button>
            </div>
        </nav>
    )
}

export default Navbar;