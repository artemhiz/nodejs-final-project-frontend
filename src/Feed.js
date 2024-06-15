import { useEffect, useState } from "react";
import { getFeed } from "./Posts-Serving";
import { useNavigate } from "react-router-dom";

export function Feed() {
    const [feed, setFeed] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getFeed(setFeed, pageNo, setTotalPages);
    }, [pageNo])

    return <>
        <h1 className="page-heading">Posts from all over the world</h1>
        <section className="feed">
            {feed.map(post => {
                return <div className="post" onClick={() => navigate(`/post/${post._id}`)} key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.text.substr(0, 300) + (post.text.length > 300 ? '...' : '')}</p>
                    <h4 className="category">{post.category}</h4>
                </div>
            })}
            { totalPages > 1 &&
                <div className="page-selector">
                    <button onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}>{'<'}</button>
                    <p>{pageNo}</p>
                    <button onClick={() => pageNo < totalPages && setPageNo(pageNo + 1)}>{'>'}</button>
                </div>
            }
        </section>
    </>
}