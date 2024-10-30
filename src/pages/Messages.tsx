import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

function Messages() {
  const user = useStore((state) => state.user);
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const therapists = useStore((state) => state.therapists);
  
  const filteredMessages = messages.filter(
    (msg) => 
      (msg.senderId === user?.id && msg.receiverId === selectedTherapist) ||
      (msg.receiverId === user?.id && msg.senderId === selectedTherapist)
  );

  const handleSend = () => {
    if (!user || !selectedTherapist || !newMessage.trim()) return;

    addMessage({
      id: Math.random().toString(),
      senderId: user.id,
      receiverId: selectedTherapist,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    });

    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-4 h-full">
        {/* Therapist List */}
        <div className="col-span-1 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
            <div className="space-y-2">
              {therapists.map((therapist) => (
                <button
                  key={therapist.id}
                  onClick={() => setSelectedTherapist(therapist.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTherapist === therapist.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{therapist.name}</p>
                      <p className="text-sm text-gray-500">
                        {therapist.specialties[0]}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 flex flex-col">
          {selectedTherapist ? (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {filteredMessages.map((message) => {
                    const isOwn = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isOwn
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            isOwn ? 'text-indigo-200' : 'text-gray-500'
                          }`}>
                            {format(new Date(message.timestamp), 'p')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;