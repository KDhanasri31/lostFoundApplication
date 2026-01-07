	package com.infosys.lostFoundApplication.controller;

	import java.util.*;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.messaging.handler.annotation.MessageMapping;
	import org.springframework.messaging.simp.SimpMessagingTemplate;
	import org.springframework.web.bind.annotation.*;
	import com.infosys.lostFoundApplication.bean.ChatMessage;

	@RestController
	@RequestMapping("/lostfound/")
	public class ChatController {
		
		@Autowired
		private SimpMessagingTemplate messagingTemplate;
		
		//online users
		private final Set<String> onlineUsers=Collections.synchronizedSet(new HashSet<>());
		
		//map sessionid-username for disconnect handling
		private final Map<String, String> sessionIdToUser=Collections.synchronizedMap(new HashMap<>());
		
		//rest endpoint to check current users(optional)
		@GetMapping("/users")
		public Set<String> getOnlineUsers(){
			return onlineUsers;
		}
		
		@MessageMapping("/register")
		public void register(ChatMessage message, org.springframework.messaging.simp.stomp.StompHeaderAccessor headerAccessor) {
			String sessionId = headerAccessor.getSessionId();
			String username=message.getSender();
			if(username != null && !username.trim().isEmpty()) {
				onlineUsers.add(username);
				sessionIdToUser.put(sessionId,  username);
				broadcastUserList();
		}
		}
		
		//websocket-send message
		@MessageMapping("/sendMessage")
		public void sendMessage(ChatMessage message) {
			messagingTemplate.convertAndSend("/topic/messages", message);
		}
		
		//optimal:remove user on disconnect
		public void removeUser(String sessionId) {
			String username=sessionIdToUser.get(sessionId);
			if(username!=null) {
				onlineUsers.remove(username);
				sessionIdToUser.remove(sessionId);
				broadcastUserList();
			}
		}
		
		//broadcast updated user list
		private void broadcastUserList() {
			messagingTemplate.convertAndSend("/topic/users", onlineUsers);
		}
		
	}



