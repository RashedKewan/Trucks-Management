package com.trucksmanagement.backend.email;

public interface EmailService {
    void sendSimpleMailMessage(String name, String to, String token);
    void sendMimeMessageWithAttachments(String name, String to, String token);
    void sendMimeMessageWithEmbeddedFiles(String name, String to, String token);
    void sendHtmlEmail(String name, String to, String token, String emailTemplate);
    void sendHtmlEmailWithEmbeddedFiles(String name, String to, String token,String emailTemplate);
}
