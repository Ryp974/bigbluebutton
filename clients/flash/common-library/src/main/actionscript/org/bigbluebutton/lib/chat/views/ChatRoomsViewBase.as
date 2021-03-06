package org.bigbluebutton.lib.chat.views {
	import mx.core.ClassFactory;
	
	import spark.components.Label;
	import spark.components.List;
	import spark.components.VGroup;
	import spark.components.supportClasses.ItemRenderer;
	import spark.layouts.VerticalLayout;
	
	public class ChatRoomsViewBase extends VGroup {
		private var _chatLabel:Label;
		
		public function get chatLabel():Label {
			return _chatLabel;
		}
		
		private var _chatRoomList:List;
		
		public function get chatRoomList():List {
			return _chatRoomList;
		}
		
		public function ChatRoomsViewBase() {
			super();
			
			_chatLabel = new Label();
			_chatLabel.percentWidth = 100;
			_chatLabel.styleName = "contentStyle";
			_chatLabel.text = "Messages";
			addElement(_chatLabel);
			
			_chatRoomList = new List();
			_chatRoomList.percentWidth = 100;
			var itemRendererClass:ClassFactory = new ClassFactory(getItemRendererClass());
			_chatRoomList.itemRenderer = itemRendererClass;
			
			var listLayout:VerticalLayout = new VerticalLayout();
			listLayout.requestedRowCount = -1;
			_chatRoomList.layout = listLayout;
			
			addElement(_chatRoomList);
		}
		
		protected function getItemRendererClass():Class {
			return ChatRoomsItemRenderer;
		}
	}
}