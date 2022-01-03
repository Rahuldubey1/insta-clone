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


const Home = () => {
    const [ feed, setFeed ] = useState();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        console.log(token)
        let result = fetch('https://instaclone222.herokuapp.com/api/v1/users/feed',{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(response => response.json())
        .then(data => {
            setFeed(data);
        })
    },[])
    console.log(feed)
    // console.log(feed.data[0].user.avatar)

if(feed != null) {
    {feed.data?.map((feeds) => {
        console.log(feeds)
    })}  
}



    return(
        <div>
            <div className="header-h">
                <nav>
                    <img src={logo} className="logo-h"></img>
                    <input placeholder="Search" type="text" className="search"></input>
                    <ul className="header-e">
                        <li className="icon"><FaHome /></li>
                        <li className="icon"><FaFileVideo /></li>
                        <li className="icon"><FaWpexplorer /></li>
                        <li className="icon"><FaHeart /></li>
                        <li className="icon"><FaUserCircle /></li>
                    </ul>
                </nav>
            </div>
            <div>
                <div className="home">
                <h1>rahul dubey</h1>
                {feed && feed.length > 0  ? (
                    <div >
                    {feed && feed.map((feeds, index) => (
                        <div className="main-b">
                            <div className="post-header-main">
                                <div className="post-header">
                                    <img className="profile" src={feed.data[0].user.avatar}/>
                                    <h3>{feed.data[0].user.username}</h3>
                                </div>
                                <img className="post-img" src={feed.data[0].files}/>
                                <div className="post-action">
                                    {feed.data[1].isLiked ? 
                                        <FaHeart className="liked"/>
                                        :
                                        <FaHeart />
                                    }
                                    <FaComment />
                                    <FaShare />
                                    {feed.data[1].isSaved ?
                                        <FaSave className="post-last"/>
                                        :
                                        <FaRegSave className="post-last"/>
                                    }
                                </div>
                                <div className="like-comment">
                                    <span className="bold">{feed.data[0].likes.length} Likes</span>
                                    <p className="no-margin"><span className="bold name">{feed.data[0].comments[0].user.username}</span>{feed.data[0].comments[0].text}</p>
                                    <span className="view-all">View all 23 comments</span>
                                    <div className="more-comment">
                                        <p className="no-margin">
                                            <span className="bold">
                                            {feed.data[0].comments[1].user.username}
                                            </span>
                                            {feed.data[0].comments[1].text}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="no-margin">
                                            <span>
                                            {feed.data[0].comments[2].user.username}
                                            </span>
                                            {feed.data[0].comments[2].text}
                                        </p>
                                    </div>
                                    <span className="time"> 4 months ago</span>
                                </div>
                                <div className="add-comment">
                                    <textarea columns="3" placeholder="Add a comment"></textarea>
                                </div>
                            </div>
                        </div> 
                      ))} 
                        <div className="suggestion">
                            <div className="suggestion-profile">
                                <img className="user-img pointer" src={feed.data[0].user.avatar} />
                                <div className="user-info">
                                    <h3>rahul2603</h3>
                                    <span>Rahul dubey</span>
                                </div>
                            </div>
                            <div className="suggestion-content">
                                <h3>Suggestions For You</h3>
                                <div className="suggestions-usercard">
                                    <div className="suggestion-row"> 
                                        <img className="user-img pointer user-image" src={feed.data[0].user.avatar} />
                                        <div className="user-info">
                                            <h3>amindd</h3>
                                            <span>Admin</span>
                                        </div>
                                    </div>
                                    <span className="follow">Follow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <h1>ghjkl</h1>
                )
                }
                </div>
                
            </div>
        </div>
    )
}

export default Home;