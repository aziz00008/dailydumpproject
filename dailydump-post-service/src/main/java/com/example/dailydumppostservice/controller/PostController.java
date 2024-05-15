package com.example.dailydumppostservice.controller;


import com.example.dailydumppostservice.model.Post;
import com.example.dailydumppostservice.model.PostResponse;
import com.example.dailydumppostservice.repository.PostRepository;
import com.example.dailydumppostservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        postService.savePost(post);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(@PathVariable String userId) {
        return ResponseEntity.ok(postService.getPostsByUser(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
}