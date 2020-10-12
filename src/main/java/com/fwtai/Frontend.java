package com.fwtai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.net.InetAddress;

@SpringBootApplication
public class Frontend extends SpringBootServletInitializer{

    @Value("${server.port}")
    private String port;

    public static void main(final String[] args){
        SpringApplication.run(Frontend.class,args);
    }

    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
        return application.sources(Frontend.class);
    }

    @Bean
    public ApplicationRunner applicationRunner() {
        return applicationArguments -> {
            System.out.println("启动成功：" + "http://" + InetAddress.getLocalHost().getHostAddress() + ":" + port);
        };
    }
}