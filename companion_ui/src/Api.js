export const fetchChatResponse = async (userMessage) => {
    try {
        const response = await fetch(`https://322a-129-21-255-70.ngrok-free.app/v1/chat/completions?question=${userMessage}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({}),
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching chat response:", error);
        return { error: true };
    }
};