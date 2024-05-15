package com.example.dailydumppostservice.repository;

import com.example.dailydumppostservice.model.Post;
import com.example.dailydumppostservice.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<UserModel, String> {

}