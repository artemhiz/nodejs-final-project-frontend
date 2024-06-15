import axios from "axios";

const pageLength = 20;

export function getFeed(setPosts, pageNo, setTotalPages) {
    axios.get('http://localhost:3030/post')
    .then(({data}) => {
        setPosts(data.reverse().slice((pageNo - 1) * pageLength, (pageNo - 1) * pageLength + pageLength));
        setTotalPages(Math.ceil(data.length / pageLength));
    })
}

export function getPost(setPost, _id) {
    axios.get(`http://localhost:3030/post/${ _id }`)
    .then(({data}) => {
        setPost(data);
    })
}

export function getProfilePosts(setPosts, authorId) {
    axios.get(`http://localhost:3030/profile/${authorId}`)
    .then(({ data }) => {
        setPosts(data.reverse());
    })
}

export function sendEdited(post, navigate) {
    axios.put(`http://localhost:3030/post/${post._id}`, post)
    .then(() => {
        navigate(-1);
    })
}

export function publishPost(post, navigate) {
    axios.post('http://localhost:3030/post', post)
    .then(() => navigate(-1));
}

export function deletePost(post, navigate, authorId) {
    axios.delete(`http://localhost:3030/post/${post._id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            authorId: authorId,
        }
    })
    .then(() => navigate(-1));
}