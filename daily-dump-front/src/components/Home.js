import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Home.css';
import { formatISO } from 'date-fns';
import AuthContext from './AuthContext'; // Adjust the import path as necessary

function Home() {
    const { username } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);
    const [profilePicUrl, setProfilePicUrl] = useState('');

    // Define fetchPosts outside useEffect 
    console.log(username)

    useEffect( () => {
        if (username) { // Ensure username is not empty
            console.log("test entry")
             fetchProfileImage(username);
            
        }
    }, [username]);
    useEffect(() => {
        console.log(profilePicUrl + " testing profile url after update"); // Debugging state after update
    }, [profilePicUrl]);
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
        
    }, []); // Dependency array is empty, so this runs only on mount

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        
    };

    const fetchProfileImage = async (usern) => {
        try { 
            const response = await axios.get('http://localhost:8080/api/users/getUser', {
                params: { username: usern }
            }); 
             setProfilePicUrl(response.data); // Set the image URL received from the server
             console.log(profilePicUrl+" testing profile url") 
            } catch (error) {
            console.error('Failed to fetch profile image:', error);
            setProfilePicUrl(''); // Set a default or error image if needed
        }
    };
    const uploadFile = async (file) => {
        // Get the presigned URL from your backend
        const response = await axios.get('http://localhost:8081/api/storage/generate-presigned-url', {params: {
            bucketName: 'dailyduploads',
            objectKey: file.name  // Now correctly accessing file.name
        }});
        const presignedUrl = response.data;
        console.log(response.data);
        console.log(file.name);
        console.log(file);
        console.log(file.type);
    
        // Upload the file using the presigned URL
        const result = await fetch(presignedUrl,{method: 'PUT',headers: {"Content-Type":file.type},body: file})
    
        if (result.ok) {
            console.log("Upload successful");
            // Optionally return the URL or any other data needed for the post
            return { url: presignedUrl };  // Assuming you might store this URL or similar
        } else {
            console.error("Upload failed");
            throw new Error('Upload failed');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = formatISO(new Date());  // Ensure the date is formatted properly
    
        // Prepare post data excluding the file object
        const postData = {
            userId: username,
           
            text: content,
            photo:'',
            creationDate: currentDate
        };
    
        // Make sure `file` is not null or undefined
        if (file) {
            try {
                // Call uploadFile passing the file object
                const uploadResponse = await uploadFile(file);
                console.log(uploadResponse);
                console.log(uploadResponse.url);

    
                // Include additional data from the upload if necessary, e.g., a file URL
                postData.photo = "https://dailyduploads.s3.amazonaws.com/"+file.name;
                console.log(postData.photo);
                console.log(postData)
                const createPostResponse = await axios.post('http://localhost:8081/api/posts/create', postData);
                console.log(createPostResponse);
                setMessage('Post successful!');
                setContent('');
                setFile(null);  // Clear the file after uploading
                fetchPosts();  // Refresh posts after adding
            } catch (error) {
                setMessage('Failed to post content.');
                console.error('Post error:', error);
            }
        } else {
            setMessage('No file selected.');
            const createPostResponse = await axios.post('http://localhost:8081/api/posts/create', postData);
                console.log(createPostResponse);
                setMessage('Post successful!');
                setContent('');
                setFile(null);  // Clear the file after uploading
                fetchPosts();  // Refresh posts after adding
        }
    };
    

    return (
        <div className="home-container">
            <header>
                <div className="logo">DailyDump</div>
                <div className="user-profile">
    <div className="profile-pic" style={{ backgroundImage: `url(${profilePicUrl})` }}></div>
    <div className="username">{username}</div>
    <div className="dropdown-content">
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
    </div>
</div>
            </header>
            <form onSubmit={handleSubmit} className="post-form">
                <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Post</button>
            </form>
            {message && <p>{message}</p>}
            <div className="posts">
                {posts.length ? posts.map((post, index) => (
                    <div key={index} className="post">
                        <div className="post-header">
                            <div className="profile-pic" style={{ backgroundImage: `url(${post.user.profilePictureUrl})` }}></div> 
                            <div className="username">{post.user.username}</div>
                        </div>
                        <p>{post.content}</p>
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                    </div>
                )) : <p>Currently no posts</p>}
            </div>
        </div>
    );
}

export default Home;
