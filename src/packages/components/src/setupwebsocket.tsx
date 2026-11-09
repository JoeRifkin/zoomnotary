export const setupWebSocket = (
    URL: any,
    token: any,
    chatId: any,
    chatName: string,
    handleMessage: any
) => {
    const webSocket = new WebSocket(`wss://${URL}/cable?token=${token}`);

    webSocket.onopen = () => {
        console.log("WebSocket connection established.", chatId, chatName);
        webSocket.send(
            JSON.stringify({
                command: "subscribe",
                identifier: JSON.stringify({
                    channel: chatName,
                    id: chatId,
                }),
                data: JSON.stringify({ id: chatId }),
            })
        );
    };

    webSocket.onclose = () => console.log("WebSocket connection closed.");

    webSocket.onerror = (error) => console.error("WebSocket error:", error);

    webSocket.onmessage = (event) => {

        try {
            const data = JSON.parse(event.data);

            if (data.message && typeof data.message.message === 'string') {
                handleMessage(data.message.message);
            } else {
            }
        } catch (error) {
        }
    };

    return webSocket;
};

export const formatChatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString(); let timeString = date.toLocaleTimeString([], options);
    if (isToday) {
        return timeString;
    } else if (isYesterday) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString;
    }
}

export const formatLiveChatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }; const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, options);
}

export const truncateText = (title: string, titleLength: number) => {
    if (title === undefined || title === null) return "";
    if (title.length > titleLength) {
        return `${title.slice(0, titleLength)}...`;
    } else {
        return title;
    }
};

export const getFileType = (file: File | string): string => {
    let extension: string | undefined; if (typeof file === 'string') {
        try {
            const url = new URL(file);
            extension = url.pathname.split('.').pop()?.toLowerCase();
        } catch (error) {
            console.error('Invalid URL:', error);
            return 'invalid';
        }
    } else if (file instanceof File) {
        extension = file.name.split('.').pop()?.toLowerCase();
    } else {
        console.error('Invalid file object');
        return 'invalid';
    } if (extension) {
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
            return 'image';
        } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
            return 'audio';
        } else if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
            return 'video';
        } else if (['pdf'].includes(extension)) {
            return 'pdf';
        } else if (['txt', 'csv', 'doc', 'docx'].includes(extension)) {
            return 'text';
        } else if (['xls', 'xlsx'].includes(extension)) {
            return 'excel';
        } else if (['ppt', 'pptx'].includes(extension)) {
            return 'powerpoint';
        }
    }

    return 'other';
};