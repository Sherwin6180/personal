import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import OpenAI from "openai";

import experienceData from './experienceData';
import projectData from './projectData';
import othersData from './othersData';

const lambdaFunctionUrl = "https://tfbizhegfpts6trc6btnrcyo7q0fppsm.lambda-url.us-east-2.on.aws/"; // Lambda Function URL

const highlightColor = 'rgb(176, 221, 133)';

// Keyframes for the float-up animation
const floatUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);  // Start from below
  }
  50% {
    opacity: 0.5;
    transform: translateY(-10px);  // Slight bob above the final position
  }
  100% {
    opacity: 1;
    transform: translateY(0);  // Settle at the final position
  }
`;

const ChatWindowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5); // Optional: adds a backdrop effect
`;

const ChatWindowContainer = styled.div`
  width: 400px;
  height: 500px;
  background-color: #1e1e1e;
  border: 3px solid rgb(176, 221, 133);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(8px);
  animation: ${floatUp} 0.8s ease-out;
`;

const ChatHeader = styled.div`
  background-color: ${highlightColor};
  color: #000;
  padding: 15px;
  font-weight: bold;
  border-radius: 12px 12px 0 0;
  text-align: center;
  font-size: 1.2em;
`;

const ChatBody = styled.div`
  padding: 15px;
  height: 350px;
  overflow-y: auto;
  color: #ddd;
  font-size: 0.95em;
`;

const ChatInputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #333;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #333;
  color: #ddd;
  font-size: 1em;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px ${highlightColor};
  }
`;

const SendButton = styled.button`
  background-color: ${highlightColor};
  color: #000;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #a6e37b;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChatMessage = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const UserMessage = styled(ChatMessage)`
  text-align: right;
  color: ${highlightColor};
`;

const BotMessage = styled(ChatMessage)`
  text-align: left;
  color: #ddd;
`;

function ChatWindow({ isVisible, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    // 从 Lambda 获取 API 密钥
    const fetchApiKey = async () => {
      try {
        const response = await fetch(lambdaFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: true, text: input }];
    setMessages(newMessages);
    setInput('');

    if (!apiKey) {
      setMessages([...newMessages, { user: false, text: "API key is not available yet." }]);
      return;
    }

    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      const context = `
        Xinyu Liang is a senior at Georgia Tech in the BSMS Computer Science program.
        He has interests in AI, networking, systems, and web development. 
        He is passionate about innovation and optimization. Outside of work, he enjoys reading, music, building tools, and working out.

        Experience:
        ${experienceData.map(exp => `${exp.role} at ${exp.company}, ${exp.location} (${exp.time}): ${exp.bullets.join(', ')}`).join('\n')}
        
        Projects:
        ${projectData.map(proj => `${proj.name}: ${proj.bullets.join(', ')}`).join('\n')}
        
        Other:
        ${othersData.map(oth => `${oth.title}: ${oth.skills ? Object.entries(oth.skills).map(([key, value]) => `${key}: ${value.join(', ')}`).join('; ') : ''} ${oth.courses ? oth.courses.join(', ') : ''}`).join('\n')}
      `;

      const completion = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4",
        messages: [
          { role: "system", content: context },
          { role: "user", content: input },
        ],
      });

      const botMessage = completion.choices[0].message.content.trim();
      setMessages([...newMessages, { user: false, text: botMessage }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { user: false, text: "Sorry, something went wrong." }]);
    }
  };

  if (!isVisible) return null;  // Don't render anything if not visible

  return (
    <ChatWindowWrapper>
      <ChatWindowContainer>
        <ChatHeader>
          Chat with Xinyu's Agent
          <button onClick={onClose} style={{ float: 'right', color: '#000', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
        </ChatHeader>
        <ChatBody>
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              {msg.user ? <UserMessage>{msg.text}</UserMessage> : <BotMessage>{msg.text}</BotMessage>}
            </React.Fragment>
          ))}
        </ChatBody>
        <ChatInputContainer>
          <ChatInput
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </ChatInputContainer>
      </ChatWindowContainer>
    </ChatWindowWrapper>
  );
}
  
export default ChatWindow;
