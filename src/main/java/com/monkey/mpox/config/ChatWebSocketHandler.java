package com.monkey.mpox.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> sessionList = new ArrayList<>();

    @Override   // 소켓 연결 개시
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("소캣 연결 감지 : "+session);
        sessionList.add(session);
    }

    @Override   // 소켓 메시지 송수신
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        for(WebSocketSession toReceiveSession : sessionList){
            toReceiveSession.sendMessage(message);
        }

        System.out.println("소켓 송수신 세션: "+session);
        System.out.println("소켓 메시지 송수신 : "+message);
    }

    @Override   // 소켓 연결 해제
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("소켓 연결 해제 : "+session);
        sessionList.remove(session);
    }
}
