package com.example.dailydumppostservice.controller;

import com.example.dailydumppostservice.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/storage")
@CrossOrigin("http://localhost:3000")
public class StorageController {
    @Autowired
    private StorageService storageService;

    @GetMapping("/generate-presigned-url")
    public ResponseEntity<String> getPresignedUrl(@RequestParam String bucketName, @RequestParam String objectKey) {
        try {
            String url = storageService.generatePresignedUrl(bucketName, objectKey);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to generate presigned URL: " + e.getMessage());
        }
    }
}
