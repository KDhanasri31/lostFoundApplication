package com.infosys.lostFoundApplication.bean;

public class ChatMessage {
		private String type;
		private String sender;
		private String content;
		
		public ChatMessage() {
		}

		public ChatMessage(String type, String sender, String content) {
			this.type = type;
			this.sender = sender;
			this.content = content;
		}


		public String getType() {
			return type;
		}

		public String getSender() {
			return sender;
		}

		public String getContent() {
			return content;
		}

		public void setType(String type) {
			this.type = type;
		}

		public void setSender(String sender) {
			this.sender = sender;
		}

		public void setContent(String content) {
			this.content = content;
		}
		
		
	}



