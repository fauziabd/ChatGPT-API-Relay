# ChatGPT JSON API
Unofficial API of ChatGPT created by ChatGPT

### Demo
`  https://chatgptapi.fauz.workers.dev/  `

### Usage
To use the app, you need to have an ChatGPT Bearer Token. Once you have the Bearer Token, you can send a message to the chat app by sending a GET request to the app with the following query parameters:

- api_key (required): Your ChatGPT provided Bearer Token.
- message (required): The message you want to send to the chat app.
- conversation_id (optional): This given after your first call to the API.
- parent_id (optional): On each call to the API, it will return the `message.id`. Use the value as your `parent_id`.

For example, to send the message "Where is New York?" to the chat app, you can use the following curl command:

`  curl -X GET 'https://your-app-url?api_key={token}&message=Where%20is%20New%20York%3F'  `

If you want to continue a conversation that you have started previously, you can include the `conversation_id` and `parent_id` query parameters in your request. These parameters are returned by the app in the response to your previous message.

For example, you want to continue the context of the previous message about "Where is New York". If you passing the `conversation_id` and `parent_id` to the query params you can continue the conversation and ChatGPT will understand the context if you ask "Tell me the history" (about New York).

`  curl -X GET 'https://your-app-url?api_key={token}&message=Tell%20me%20the%20history%3F&conversation_id={conversation_id}&parent_id={message.id}'  `

<hr>

### How to get Bearer Token
1. Open `https://chat.openai.com/chat`
2. Login or create account
3. Open developer tools (F12) -> Go to Network
4. Send your fist message
5. On the Network tab, find request name: conversation. Click on it.
6. Find `autorization` under Request Headers
7. Copy the value without the word "Bearer "
![image](https://user-images.githubusercontent.com/13282094/206120949-ad2f2cff-7335-4a1e-a9fc-81187d51d1fd.png)
