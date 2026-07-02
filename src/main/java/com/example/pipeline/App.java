package com.example.pipeline;

public class App {
    public String getStatus() {
        return "Systems Online";
    }

    public static void main(String[] args) {
        System.out.println(new App().getStatus());
    }
}
