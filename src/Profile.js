import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfilePosts } from "./Posts-Serving";

export default function Profile() {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            getProfilePosts(setPosts, user.sub)
        }
    }, [isAuthenticated, user])

    return <section className="profile">
        <button onClick={() => navigate(-1)} className="back">{'< Back'}</button>
        <h1 className="page-heading">Your profile</h1>
        <section className="user-info">
            {
                isAuthenticated ? <>
                    <img src={user.picture} alt="" />
                    <h1>{user.nickname}</h1>
                    <button onClick={() => navigate('/editor')}>Post something new!</button>
                </> : <>
                    <h3>Sign In to see your profile info</h3>
                    <button onClick={loginWithRedirect}>Sign In</button>
                </>
            }
        </section>
        {
            isAuthenticated && <section className="posts">
                <h2>Your posts:</h2>
                {
                    posts.map(post => {
                        return <div className="post" onClick={() => navigate(`/post/${post._id}`)} key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.text.substr(0, 300) + (post.text.length > 300 ? '...' : '')}</p>
                            <h4 className="category">{post.category}</h4>
                        </div>
                    })
                }
            </section>
        }
    </section>
}