package com.example.dailydumppostservice.service;

import com.example.dailydumppostservice.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class UserServiceClient {
    @Autowired
    private WebClient webClient;

    public UserModel fetchUserById(String userId){
        return webClient.get()
                .uri("http://service1-dailydump-user-service-1:8080/api/users/{userId}", userId)
                .retrieve()
                .bodyToMono(UserModel.class)
                .block();  // Block to wait for the response synchronously (use with caution)
    }

}
