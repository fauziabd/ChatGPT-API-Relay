# ChatGPT API Relay on Cloudflare Workers
Send message to ChatGPT and get the response in JSON API

### Demo
`https://chatgptapi.fauz.workers.dev/`

### How to install
1. Create new Workers on Cloudflare Workers
2. Copy the `index.js` to the Workers' editor
3. Publish and Deploy

### Usage
To use the API Relay, you need to have an ChatGPT Bearer Token. Once you have the Bearer Token, you can send a message to the ChatGPT by sending a GET request to the Cloudflare Workers URL with the following query parameters:

- `api_key` (required)
- `message` (required)
- `conversation_id` (optional)
- `parent_id` (optional)

For example, to send the message "Where is New York?" you can use the following curl command:

`curl -X GET 'https://workers.name.workers.dev/?api_key={Bearer Token}&message=Where%20is%20New%20York%3F'`

If you want to continue a conversation, include the `conversation_id` and `parent_id` in query parameters.

For example if you ask "Tell me the history" (about New York), you can use the following curl command:

`curl -X GET 'https://workers.name.workers.dev/?api_key={token}&message=Tell%20me%20the%20history%3F&conversation_id={conversation_id}&parent_id={message.id}'`

### How to get Bearer Token
1. Open `https://chat.openai.com/chat`
2. Login or create account
3. Open developer tools (F12) -> Go to Network
4. Send your fist message
5. On the Network tab, find request name: conversation. Click on it.
6. Find `autorization` under Request Headers
7. Copy the value without the word "Bearer "
![image](https://user-images.githubusercontent.com/13282094/206120949-ad2f2cff-7335-4a1e-a9fc-81187d51d1fd.png)


### Example Response
`{
  "message": {
    "id": "dff23822-8374-4a43-bd50-1644b5f101c6",
    "role": "assistant",
    "user": null,
    "create_time": null,
    "update_time": null,
    "content": {
      "content_type": "text",
      "parts": [
        "As a large language model trained by OpenAI, I am able to understand and respond to text input on a wide range of topics. I can provide information, answer questions, and engage in conversation, although I do not have access to the internet and my responses are limited to what I have been trained on. Is there something specific you would like to know or talk about?"
      ]
    },
    "end_turn": null,
    "weight": 1,
    "metadata": {},
    "recipient": "all"
  },
  "conversation_id": "f2ca1dd9-5469-4ba5-8048-7c3b88495daf",
  "error": null
}`


