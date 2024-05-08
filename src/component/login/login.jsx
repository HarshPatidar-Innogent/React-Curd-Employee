import "./login.css"
export function Login(){
    return(
        <div className="container-fluid">
            <form action="">
            <h2>User Login</h2>
            <dl>
                <dt>User Name</dt>
                <dd><input type="text" /></dd>
                <dt>Password</dt>
                <dd><input type="password" /></dd>
            </dl>
            </form>
        </div>
    )
}