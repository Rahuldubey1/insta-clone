import react, { useEffect, useState } from "react";
import logo from "../assets/navlogo.png";
import { FaHome } from 'react-icons/fa';
import { FaFileVideo } from 'react-icons/fa';
import { FaWpexplorer } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaRegSave } from 'react-icons/fa';
import Loader from '../components/loader';
import { timeSince } from "../shared/constants";
import Suggestion from "./suggestion";
import Comment from "./comment";


const Home = () => {
    const [ feed, setFeed ] = useState();
    const [ token, setToken ] = useState();
    const [ comment, setComment ] = useState();
    const [ backup, setBackup ] = useState();
    const [newComments, setNewComments] = useState([]);


    useEffect(()=>{
        const token = localStorage.getItem("token");
        setToken(token);
        let result = fetch('https://instaclone222.herokuapp.com/api/v1/users/feed',{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(response => response.json())
        .then(data => {
            setFeed(data.data);
        })
    },[])
    console.log(feed)

    const like = (id) => {
        console.log(id)
            let result = fetch(`https://instaclone222.herokuapp.com/api/v1/posts/${id}/toggleLike`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            }).then(response => response.json())
            .then(data => {
                if(data.success) {
                let result = fetch('https://instaclone222.herokuapp.com/api/v1/users/feed',{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json",
                        "Accept": "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                }).then(response => response.json())
                .then(data => {
                    setFeed(data.data);
                })
            }
            })
    }

    const save = (id) => {
        let result = fetch(`https://instaclone222.herokuapp.com/api/v1/posts/${id}/toggleSave`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(response => response.json())
        .then(data => {
            if(data.success) {
            let result = fetch('https://instaclone222.herokuapp.com/api/v1/users/feed',{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            }).then(response => response.json())
            .then(data => {
                setFeed(data.data);
            })
        }
        })
    }
 
    /*console.log(user.username)*/


// if(feed != null) {
//     {feed.data?.map((feeds) => {
//         console.log(feeds)
//     })}  
// }

    const handleAddComment = (e,value) => {
        if (e.key === 'Enter') {
            var data = {text:e.target.value};
            e.target.value = ''
        let result = fetch(`https://instaclone222.herokuapp.com/api/v1/posts/${value}/comments`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body:JSON.stringify(data)
            }).then(response => response.json())
            .then(data => {
                setNewComments([...newComments, data.data])
        })
        }
        console.log(newComments)
    }


    return(
        <div>
            <div className="header-h">
                <nav>
                    <img src={logo} className="logo-h pointer"></img>
                    <input placeholder="Search" type="text" className="search"></input>
                    <ul className="header-e">
                        <li className="icon pointer"><FaHome /></li>
                        <li className="icon pointer"><FaFileVideo /></li>
                        <li className="icon pointer"><FaWpexplorer /></li>
                        <li className="icon pointer"><FaHeart /></li>
                        <li className="icon pointer"><FaUserCircle /></li>
                    </ul>
                </nav>
            </div>
            <div>
                <div className="home">
                {feed && feed.length > 0  ? (
                    <div >
                    {feed && feed.map((feeds, index) => (
                        <div className="main-b">
                            <div className="post-header-main">
                                <div className="post-header pointer">
                                    <img className="profile" src={feeds.user.avatar}/>
                                    <h4>{feeds.user.username}</h4>
                                </div>
                                <img className="post-img" src={feeds.files}/>
                                <div className="post-action">
                                    {feeds.isLiked ? 
                                        <FaHeart className="liked pointer" onClick={()=>like(feeds._id)}/>
                                        :
                                        <FaHeart className="pointer" onClick={()=>like(feeds._id)}/>
                                    }
                                    <FaComment className="pointer" />
                                    <FaShare className="pointer"/>
                                    {feeds.isSaved ?
                                        <FaSave className="post-last pointer" onClick={()=>save(feeds._id)}/>
                                        :
                                        <FaRegSave className="post-last pointer" onClick={()=>save(feeds._id)}/>
                                    }
                                </div>
                                <div className="like-comment">
                                    <span className="bold">{feeds.likes.length} Likes</span>
                                    <p className="no-margin"><span className="bold name">{feeds.comments[0].user.username}</span>{feeds.comments[0].text}</p>
                                    {feeds.commentsCount > 2 && (
                                    <span
                                        // onClick={() => history.push(`/p/${post._id}`)}
                                        className="view-all pointer"
                                    >
                                        View all {feeds.commentsCount} comments
                                    </span>
                                    )}
                                    {/* <span className="view-all pointer">View all 23 comments</span> */}
                                    <div className="more-comment">
                                        <p className="no-margin">
                                            <span className="bold">
                                            {feeds.comments[1].user.username}
                                            </span>
                                            {feeds.comments[1].text}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="no-margin">
                                            <span>
                                            {feeds.comments[2].user.username}
                                            </span>
                                            {feeds.comments[2].text}
                                        </p>
                                    </div>
                                    {newComments.map((comment) => (
                                        <Comment key={comment._id} hideavatar={true} comment={comment} />
                                    ))}
                                    <span className="time">{timeSince(feeds.createdAt)} ago</span>
                                </div>
                                <div className="add-comment">
                                    <textarea columns="3"
                                    placeholder="Add a comment"
                                    value={comment?.value}
                                    onKeyDown={(e)=>handleAddComment(e,feeds._id)}
                                    ></textarea>
                                    {/* <div className="button-text">
                                        <button onClick={()=>addComment(feeds._id)}>hello</button>
                                    </div> */}
                                </div>
                            </div>
                        </div> 
                    ))} 
                        <Suggestion />
                    </div>
                ) : (
                    <Loader />
                )
                }
                </div>
                
            </div>
        </div>
    )
}

export default Home;