package net.webspite.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping("/")
    public String root(Map<String, Object> model) {
        model.put("title", "");
        model.put("message", "This is a message from Spring Boot injected via Thymeleaf");
        return "index";
    }
}
