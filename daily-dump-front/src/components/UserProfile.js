import React, { useContext, useState ,useEffect} from 'react';
import './UserProfile.css'; 
import axios from 'axios';
import AuthContext from './AuthContext'; 

function UserProfile() {
    const { username } = useContext(AuthContext);
    const [profilePicUrl, setProfilePicUrl] = useState(''); 
    const [file, setFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/posts/all');
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    };

    useEffect(() => {
        fetchPosts();
        
    }, []);
    useEffect( () => {
        if (username) { 
            console.log("test entry")
             fetchProfileImage();
            
        }
    }, [username]);
    useEffect(() => {
        console.log(profilePicUrl + " testing profile url after update"); // Debugging state after update
    }, [profilePicUrl]);
    
    const handleEditPicture = () => {
        const fileInput = document.getElementById('fileInput');
        if(fileInput) {
            fileInput.click();
        } else {
            console.error('The file input is not rendered yet.');
        }
    };
    const uploadFile = async (file) => {
        
        console.log(file.name)
        const response = await axios.get('http://localhost:8080/api/storage/generate-presigned-url', {params: {
            bucketName: 'dailyduploads',
            objectKey: "profilepics/"+file.name 
        }});
        
        const presignedUrl = response.data;
         
    
        
        const result = await fetch(presignedUrl,{method: 'PUT',headers: {"Content-Type":file.type},body: file})
    
        if (result.ok) {
            console.log("Upload successful");
            
            return { url: presignedUrl };  
        } else {
            console.error("Upload failed");
            throw new Error('Upload failed');
        }
    };
    const saveuserPhoto = async (url) => {
        
        console.log(username+"testing if username is")
        console.log(url+"testing if url is there")
        const params = new URLSearchParams();
    params.append('username', username);
    params.append('url', url);
         const response = await axios.post('http://localhost:8080/api/storage/save-user-img', params); 
        const presignedUrl = response.data;

        
    
        
        
    };

    
    const  handleFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        const uploadresponse = await uploadFile(file)
        if (uploadresponse && uploadresponse.url){
        saveuserPhoto("https://dailyduploads.s3.amazonaws.com/profilepics/"+file.name)
        setProfilePicUrl("https://dailyduploads.s3.amazonaws.com/profilepics/"+file.name)
    }
        
        
          console.log(profilePicUrl+"testprofil epic url");
    };
    const fetchProfileImage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/getUser', {
                params: { username: username }
            }); 
             setProfilePicUrl(response.data); 
             console.log(profilePicUrl+" testing profile url") 
            } catch (error) {
            console.error('Failed to fetch profile image:', error);
            setProfilePicUrl(''); 
        }
    };
   

    return (
        <div className="user-profile-container">
            <header className="user-profile-header">
                <div className="user-profile-logo">DailyDump</div>
            </header>
            <div className="user-profile-area">
                <div className="user-profile-info">
                    <div className="profile-picture-container">
                        <div className="user-profile-pic" style={{ backgroundImage: `url(${profilePicUrl})` }}></div>
                        <a href="#" className="edit-profile-pic"  onClick={handleEditPicture}>Edit</a>
                    </div>
                    <div className="username">{username}</div>
                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                </div>
                <div className="user-posts-section">
                    <h2>Recent Posts</h2> 
                    <div className="user-posts">
                        {posts.filter(post => post.user && post.user.username === username).length > 0 ? (
                            posts.filter(post => post.user && post.user.username === username).map((post, index) => (
                                <div key={index} className="post">
                                    <p>{post.content}</p>
                                    {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                                </div>
                            ))
                        ) : <p>No posts to display yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
