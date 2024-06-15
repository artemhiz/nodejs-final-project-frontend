import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getPost, publishPost, sendEdited } from "./Posts-Serving";

export default function Editor() {
    const [editorMode, setEditorMode] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    const [disabled, setDisability] = useState('disabled');
    const [post, setPost] = useState({
        title: '',
        text: '',
        category: '',
    });

    useEffect(() => {
        if (isAuthenticated && params._id) {
            getPost(setPost, params._id);
            if (post.authorId === user.sub) {
                setDisability('');
                setEditorMode(true);
            } else if (isAuthenticated) {
                setPost({
                    title: '',
                    text: '',
                    category: '',
                    authorId: user.sub,
                })
            }
        } else if (isAuthenticated) {
            setDisability('');
        }
    }, [params, isAuthenticated, post.authorId, user])

    function prepareAndSubmit(event) {
        event.preventDefault();
        if (editorMode) {
            sendEdited(post, navigate);
        } else {
            publishPost({...post, authorId: user.sub}, navigate)
        }
    }

    return isAuthenticated ? <section className="editor">
        <button className="back" onClick={() => navigate(-1)}>{'< Back'}</button>
        <select value={post.category} disabled={disabled} onChange={event => setPost({...post, category: event.target.value})}>
            <option value=''>---</option>
            <option value='Real Estate'>Real Estate</option>
            <option value='Entrepreneurship'>Entrepreneurship</option>
            <option value='Human Rights'>Human Rights</option>
        </select>
        <input className="title" type="text" disabled={disabled} value={post.title} onChange={event => setPost({...post, title: event.target.value})}/>
        <textarea className="text" disabled={disabled} value={post.text} onChange={event => setPost({...post, text: event.target.value})}/>
        <div className="controls">
            <button onClick={e => prepareAndSubmit(e)} disabled={post.title && post.text && post.category ? '' : 'disabled'}>{editorMode ? 'Finish editing and Publish' : 'Publish'}</button>
        </div>
    </section> : <div className="login">
        <h3>You must log in to write posts</h3>
        <button onClick={loginWithRedirect}>Sign In</button>
    </div>
}