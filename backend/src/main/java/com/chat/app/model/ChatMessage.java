package com.chat.app.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "messages")
public class ChatMessage {
    private String sender;
    private String content;
    private Date timestamp;
    // Getters and Setters
}