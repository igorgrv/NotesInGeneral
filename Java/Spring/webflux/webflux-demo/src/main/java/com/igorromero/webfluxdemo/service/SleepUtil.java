package com.igorromero.webfluxdemo.service;

public class SleepUtil {
    
    public SleepUtil (int delay) {
        try {
            Thread.sleep(delay * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
