import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "./Posts-Serving";
import DeletionPopup from "./Deletion-Popup";

export default function FullPost() {
    const { isAuthenticated, user } = useAuth0();
    const [post, setPost] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const [deletionPopupAppearance, setDeletionPopupAppearance] = useState(false);

    useEffect(() => {
        getPost(setPost, params._id)
    }, [params])

    return <section className="full-post">
        <button className="back" onClick={() => navigate(-1)}>{'< Back'}</button>
        {
            isAuthenticated && user.sub === post.authorId &&
            <div className="owner-controls">
                As the owner of this post, you can 
                <button onClick={() => navigate(`/editor/${post._id}`)}>Edit</button>
                or 
                <button id="delete" onClick={() => setDeletionPopupAppearance(true)}>Delete</button>
                it
            </div>
        }
        <h1>
            <p className="category">{post.category}</p>
            {post.title}
        </h1>
        <p>{post.text}</p>
        { deletionPopupAppearance && <DeletionPopup post={ post } setDeletionPopupAppearance={ setDeletionPopupAppearance }/>}
    </section>
}