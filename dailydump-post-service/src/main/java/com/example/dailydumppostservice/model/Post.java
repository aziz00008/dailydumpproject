package com.example.dailydumppostservice.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "posts")
@Getter
@Setter
public class Post {
    @Id
    private String id;
    private String userId;
    private String postUserphoto;
    private String text;    // Text content of the post
    private String photo;
    private Date creationDate; // Timestamp when the post was created


}
