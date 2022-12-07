addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

const sseSubstringLength = "data: ".length;

async function post(url, data, bearerToken) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 x-openai-assistant-app-id`,
        },
        body: JSON.stringify(data),
    });
    return res.text();
}

async function chat(bearerToken, message, conversationId, parentId) {
    const payload = {
        action: "next",
        messages: [{
            id: crypto.randomUUID(),
            role: "user",
            content: {
                content_type: "text",
                parts: [message]
            },
        }],
        parent_message_id: parentId || crypto.randomUUID(),
        model: "text-davinci-002-render",
    };

    if (conversationId) {
        payload.conversation_id = conversationId;
    }

    const response = await post(
        "https://chat.openai.com/backend-api/conversation",
        payload,
        bearerToken
    );

    const sseMessages = response.split("\n").filter((s) => s.length);
    const result = JSON.parse(
        sseMessages[sseMessages.length - 2].substring(sseSubstringLength)
    );

    return result;
}

async function handleRequest(request) {
    // Parse the request query string
    const queryParams = new URL(request.url).searchParams;
    const apiKey = queryParams.get("api_key");
    const messageCode = queryParams.get("message");
    const conversationId = queryParams.get("conversation_id");
    const parentId = queryParams.get("parent_id");
    const message = decodeURIComponent(messageCode);

    if (!apiKey) {
        return new Response(JSON.stringify({
            error: "Enter you API Key, Boys!"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    if (!message) {
        return new Response(JSON.stringify({
            error: "No message provided"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        let response;

        if (conversationId && parentId) {
            response = await chat(apiKey, message, conversationId, parentId);
        } else {
            response = await chat(apiKey, message);
        }

        // Return the response in JSON format
        return new Response(JSON.stringify(response), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
