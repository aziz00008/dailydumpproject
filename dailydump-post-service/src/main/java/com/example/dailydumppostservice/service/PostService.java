package com.example.dailydumppostservice.service;
import com.example.dailydumppostservice.model.Post;
import com.example.dailydumppostservice.model.PostResponse;
import com.example.dailydumppostservice.model.UserModel;
import com.example.dailydumppostservice.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserServiceClient uservice;


    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getPostsByUser(String userId) {
        return postRepository.findAllByUserId(userId);
    }

    public List<PostResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(post -> {
                    UserModel user = uservice.fetchUserById(post.getUserId());
                    return new PostResponse(post.getId(),post.getText(),new PostResponse.UserModel(user.username, user.image), post.getPhoto());
                })
                .collect(Collectors.toList());
    }



}