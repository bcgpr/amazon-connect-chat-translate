// Using fetch directly for unauthenticated API calls
async function ProcessChatTextAPI(content, sourceLang, targetLang) {
    // Get the API endpoint from environment or use the production endpoint
    const apiEndpoint = process.env.REACT_APP_TRANSLATE_API_ENDPOINT || 'https://rhgmz55rmh.execute-api.us-east-1.amazonaws.com/production';
    const path = '/translate';
    const url = `${apiEndpoint}${path}`;
    
    const requestBody = {
        content: content,
        sourceLang: sourceLang,
        targetLang: targetLang
    };
    
    console.log("ProcessChatTextAPI: ", content);
    console.log("ProcessChatTextAPI: ", sourceLang);
    console.log("ProcessChatTextAPI: ", targetLang);
    console.log("ProcessChatTextAPI URL: ", url);
    console.log("ProcessChatTextAPI Body: ", requestBody);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const resp = await response.json();
        console.log("Translated Message Payload: ", resp);
        return resp;
    }
    catch (error) {
        console.error("ProcessChatTextAPI: ", error);
        return error;
    }
}
export default ProcessChatTextAPI
