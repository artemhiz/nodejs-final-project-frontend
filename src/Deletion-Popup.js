import { useAuth0 } from "@auth0/auth0-react"
import { deletePost } from "./Posts-Serving";
import { useNavigate } from "react-router-dom";

export default function DeletionPopup({ post, setDeletionPopupAppearance }) {
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

    function prepareForDeletion() {
        if (user.sub === post.authorId) {
            deletePost(post, navigate, user.sub);
        }
    }

    return isAuthenticated && <div className="bg">
        <div className="window">
            <h3 className="heading">Are you sure you want to delete this post?</h3>
            <p>Anyone, as well as you, will not be able to see this post. And this action cannot be reversed.</p>
            <div className="confirmation">
                <button className="cancel" onClick={() => setDeletionPopupAppearance(false)}>Cancel</button>
                <button className="delete" onClick={prepareForDeletion}>Delete Anyways</button>
            </div>
        </div>
    </div>
}