package com.example.dailydumppostservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.userdetails.UserDetails;
@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserModel {


        @Id
        public String id;

        public String username;

        public String password;
        public String image;


        public Role role;
}
