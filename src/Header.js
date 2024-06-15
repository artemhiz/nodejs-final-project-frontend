import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import './Header.css'

export default function Header() {
    const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
    const navigate = useNavigate();

    return <header>
        <h1 onClick={() => navigate('/')}>UFeed</h1>
        {
        isAuthenticated && !isLoading ? <div className="account">
            <button onClick={logout}>Sign Out</button>
            <div className="profile" onClick={() => navigate('/profile')}>
                <p>{user.nickname}</p>
                <img src={user.picture} alt=""/>
            </div>
        </div>
        : !isLoading &&
        <div className="account">
            <button onClick={loginWithRedirect}>Sign In</button>
            <p>to make posts yourself</p>
        </div>
        }
    </header>
}
