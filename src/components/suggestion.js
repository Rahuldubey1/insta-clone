import react, { useEffect, useState } from "react";

const Sugesstion = () => {
    
    const [ user, setUser ] = useState();
    const [ token, setToken ] = useState();
    const [ userData, setUserData ] = useState();
    const [ myData, setMyData ] = useState();
    const [ myFollowingId, setmyFollowingId ] = useState([]);
    const [ finalData, setfinalData ] = useState([]);
    const [followingState, setFollowingState] = useState();



    useEffect(()=>{
        const token = localStorage.getItem("token");
        setToken(token);
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user);
        let data = fetch(`https://instaclone222.herokuapp.com/api/v1/users/${user.username}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(response => response.json())
        .then(data => {
            setMyData(data.data);
        }) 
        let result = fetch('https://instaclone222.herokuapp.com/api/v1/users',{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }).then(response => response.json())
        .then(data => {
            if(myData) {
                let array = [];
                myData.following.map((id)=> { 
                    array.push(id._id);
                    setmyFollowingId(array);
                })
            }
            if(data.data) {
                let arrayData = [];
                console.log(userData)
                data.data.map((ids) => {
                    if( myFollowingId.includes(ids._id)){
                    } else {
                        arrayData.push(ids)
                    }
                })
                console.log(arrayData)
                setfinalData(arrayData.slice(0, 4));
            }            
        })  
    },[])
    
    const handleFollow = (followingState,id) => {
        console.log(followingState)
        if (followingState) {
            alert("1")
          setFollowingState(false);
          let data = fetch(`https://instaclone222.herokuapp.com/api/v1/users/${id}/unfollow`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            }).then(response => response.json())
            .then(data => {
            console.log(data)
            })
        } else {
            alert("2")
            setFollowingState(true);
            let data = fetch(`https://instaclone222.herokuapp.com/api/v1/users/${id}/follow`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            }).then(response => response.json())
            .then(data => {
            console.log(data)
            })
        }
      };

    return (
        <div className="suggestion">
            <div className="suggestion-profile pointer">
                <img className="user-img pointer" src={user?.avatar} />
                <div className="user-info">
                    <h4>{user?.username}</h4>
                    <span>{user?.fullname}</span>
                </div>
            </div>
            <p>{console.log(finalData)}</p>
            <div className="suggestion-content">
                <h4 className="suggestion-heading">Suggestions For You</h4>
                {finalData && finalData.length > 0 ? (
                    <div>
                        {finalData && finalData.map((data, index) => (
                            <div className="suggestions-usercard">
                                <div className="suggestion-row"> 
                                    <img className="user-img pointer user-image" src={data?.avatar} />
                                    <div className="user-info">
                                        <h4>{data.username}</h4>
                                        <span>{data.fullname}</span>
                                    </div>
                                </div>
                                {followingState ? (
                                    <span className="Follow pointer" onClick={() => handleFollow(data.isFollowing,data._id)}>Following</span>
                                ) : (
                                    <span className="Follow pointer" onClick={() => handleFollow(data.isFollowing,data._id)}>Follow</span>
                                )
                                }
                            </div>
                        ))}
                    </div>
                    ) : ( 
                        <p className="suggestion-heading">Right now, there's no suggestions for you</p>
                    )
                } 
                </div>
            </div>
    )
}

export default Sugesstion;