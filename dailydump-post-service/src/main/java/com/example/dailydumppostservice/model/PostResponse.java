package com.example.dailydumppostservice.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostResponse{
    private String id;
    private String content;
    private UserModel user;

    private String imageUrl;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserModel {
        private String username;
        private String profilePictureUrl;
    }
}
