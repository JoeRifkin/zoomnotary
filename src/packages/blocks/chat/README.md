## Building Blocks React Native Mobile -  Chat
Building Blocks - React Native Master App - Chat

## Getting Started
N/A
### Prerequisites
N/A
### Git Structure
N/A
### Installing
N/A
## Running the tests
N/A
## CI/CD Details
N/A
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).


===============
# Developer Guide - by Delivery team for customer projects
===============


## Key Classes, Methods, and Configurations

### 1. Key Classes

- **`Chat` Class (`src/Chat.tsx`)**:
  - **Description**: This is the main React component class for handling chat-related UI and interactions.
  - **Inheritance**: Extends `ChatController`, meaning it inherits methods and properties from the `ChatController`.
  - **Key Methods**:
    - **`renderAddRoomModal()`**: Renders a modal for creating a new chat room.
    - **`renderRoomList()`**: Renders a list of available chat rooms.
    - **`render()`**: The main render method that combines different UI elements.

- **`ChatController` Class (`src/ChatController.tsx`)**:
  - **Description**: Acts as the logic layer behind the `Chat` component, managing state, API interactions, and business logic.
  - **Key Methods**:
    - **`componentDidMount()`**: Lifecycle method to initialize chat data when the component mounts.
    - **`navigateToChatView(chatId: string)`**: Navigates to a specific chat view when a chat room is selected.
    - **`createChatRoom()`**: Handles the creation of a new chat room by interacting with the appropriate API endpoint.
    - **`sendMessage()`**: Sends a message to the selected chat room using the send message API endpoint.

- **`ViewChat` Class (`src/ViewChat.tsx`)**:
  - **Description**: A React component that displays the chat interface for a selected chat room.
  - **Inheritance**: Extends `ViewChatController`, inheriting its methods and properties.
  - **Key Methods**:
    - **`renderMessages()`**: Renders the list of messages in the chat.
    - **`renderInputField()`**: Renders the input field for typing and sending messages.

- **`ViewChatController` Class (`src/ViewChatController.tsx`)**:
  - **Description**: Manages the logic for the `ViewChat` component, including message handling and chat history retrieval.
  - **Key Methods**:
    - **`fetchChatHistory(chatId: string)`**: Fetches the chat history from the backend API.
    - **`handleSendMessage()`**: Processes the sending of a new message and updates the chat view.

### 2. Key Configurations

- **`config.js` (`src/config.js`)**:
  - **Purpose**: Contains configuration values, API endpoints, and text strings used throughout the chat components.
  - **Key Configurations**:
    - **API Endpoints**:
      - `getChatListApiEndPoint`: `chat/chats`
      - `showChatApiEndPoint`: `chat/chats`
      - `getChatHistoryApiEndPoint`: `chat/chats/history`
      - `sendMessageApiEndPoint`: `chat/chats`
      - *(And others related to specific chat actions like adding users, leaving chats, etc.)*
    - **Text Strings**:
      - `createButtonText`: `"Create"`
      - `sendText`: `"Send"`
      - `writeMessagePlaceholder`: `"Write message here"`
      - *(And others related to UI labels and error messages)*

### 3. Key Methods

- **`navigateToChatView(chatId: string)`** (`ChatController` Class):
  - **Description**: Navigates the user to the selected chat view.
  
- **`createChatRoom()`** (`ChatController` Class):
  - **Description**: Interacts with the backend to create a new chat room.

- **`sendMessage()`** (`ChatController` Class):
  - **Description**: Sends a message to the chat room using the API.

- **`fetchChatHistory(chatId: string)`** (`ViewChatController` Class):
  - **Description**: Retrieves chat history for a specific chat room from the backend.

- **`handleSendMessage()`** (`ViewChatController` Class):
  - **Description**: Handles the process of sending a message, including updating the UI and interacting with the backend.



## Workflows, How It Works, and Customization Guide

### 1. Workflows

#### **1.1. Initialization Workflow**
- **Component Mounting**: 
  - When the `Chat` component is mounted, the `componentDidMount` method of the `ChatController` is invoked.
  - **Key Methods**: 
    - `componentDidMount()` fetches the initial list of chat rooms by calling an API endpoint using the `getChatListApiEndPoint`.

- **Chat Room Rendering**:
  - The `renderRoomList` method in the `Chat` component is responsible for rendering the available chat rooms.
  - Users can select a chat room, which triggers the `navigateToChatView(chatId)` method to load the chat's messages.

#### **1.2. Chat Interaction Workflow**
- **Message Sending**:
  - Users type a message in the input field (e.g., rendered by `renderInputField` in `ViewChat`).
  - When a message is sent, the `sendMessage` method in `ChatController` is invoked, which posts the message to the backend using the `sendMessageApiEndPoint`.
  - The sent message is then broadcast to other users in the chat and displayed in the chat view.

- **Message Reception**:
  - Messages received from other users are fetched by the `fetchChatHistory(chatId)` method in the `ViewChatController`.
  - The `renderMessages` method displays these messages in the chat interface.

#### **1.3. Chat Room Management Workflow**
- **Creating a Chat Room**:
  - Users can create a new chat room by triggering the `createChatRoom()` method, which makes a POST request to `createChatRoomApiEndPoint`.
  - The new room is added to the list of available chat rooms.

- **Managing Participants**:
  - Users can be added to or removed from a chat room using API endpoints like `addUserToChatApiEndPoint` and `leaveChatApiEndPoint`, managed by corresponding methods in `ChatController`.

### 2. How It Works

- **API Integration**:
  - The package integrates with backend services through various API endpoints configured in `config.js`. 
  - Key API interactions include fetching chat lists, sending messages, retrieving chat history, and managing participants in a chat room.

- **State Management**:
  - The package relies on React's component state to manage UI updates, such as the list of chat rooms and messages.
  - The `ChatController` and `ViewChatController` classes handle state changes, ensuring the UI reflects the current state of the chat.

- **UI Rendering**:
  - The UI is primarily rendered by the `Chat` and `ViewChat` components, which use methods like `renderRoomList`, `renderMessages`, and `renderInputField` to display the chat interface.

### 3. Customization Guide

#### **3.1. Adding a Rich Text Editor**

To add a rich text editor to the chat input box:

1. **Integrate a Rich Text Editor**:
   - Use a React Native rich text editor, such as `react-native-richtext-editor`.
   - Install the package:
     ```bash
     yarn add react-native-richtext-editor
     ```
   - Update the `ViewChat` component to replace the standard text input with the rich text editor:
     ```javascript
     import RichTextEditor from 'react-native-richtext-editor';

     renderInputField = () => {
       return (
         <RichTextEditor
           style={styles.richTextEditor}
           onChangeText={text => this.handleInputChange(text)}
           placeholder="Type your message..."
         />
       );
     };
     ```

2. **Handle Rich Text in Backend**:
   - Ensure that the backend is configured to handle rich text content, typically stored in formats like HTML or Markdown.
   - Modify the `sendMessage()` method in `ChatController` to handle rich text content:
     ```javascript
     sendMessage = () => {
       const richTextContent = this.state.inputContent; // Assuming inputContent holds the rich text
       // Process and send richTextContent to the backend
     };
     ```

#### **3.2. Customizing Embedded UIs**

To customize embedded UIs for features like file uploads, images, or video sharing:

1. **Customize File Uploads**:
   - Integrate a file picker library such as `react-native-document-picker`:
     ```bash
     yarn add react-native-document-picker
     ```
   - Add a button in the `ViewChat` component for file uploads:
     ```javascript
     import DocumentPicker from 'react-native-document-picker';

     handleFileUpload = async () => {
       try {
         const res = await DocumentPicker.pick({
           type: [DocumentPicker.types.allFiles],
         });
         console.log('Selected file:', res);
         // Handle file upload logic here
       } catch (err) {
         if (DocumentPicker.isCancel(err)) {
           console.log('User canceled file picker');
         } else {
           throw err;
         }
       }
     };

     renderInputField = () => {
       return (
         <View>
           <RichTextEditor
             style={styles.richTextEditor}
             onChangeText={text => this.handleInputChange(text)}
             placeholder="Type your message..."
           />
           <Button title="Upload File" onPress={this.handleFileUpload} />
         </View>
       );
     };
     ```

2. **Embed Image/Video Previews**:
   - Customize the `renderMessages()` method in `ViewChat` to handle and display image or video previews:
     ```javascript
     renderMessages = () => {
       return this.state.messages.map((message, index) => (
         <View key={index}>
           {message.type === 'image' && (
             <Image source={{ uri: message.content }} style={styles.imagePreview} />
           )}
           {message.type === 'video' && (
             <Video source={{ uri: message.content }} style={styles.videoPreview} />
           )}
           {message.type === 'text' && (
             <Text style={styles.messageText}>{message.content}</Text>
           )}
         </View>
       ));
     };
     ```

3. **Update Backend Handling**:
   - Ensure that the backend API endpoints can handle different types of content (e.g., text, images, videos).
   - Update the `sendMessage()` method to correctly handle and send different content types:
     ```javascript
     sendMessage = () => {
       const messageContent = this.state.inputContent;
       const messageType = determineContentType(messageContent); // Logic to determine if it's text, image, etc.
       // Send message with the appropriate type and content
     };
     ```

### Summary

The React package is structured to handle chat functionalities effectively through well-defined workflows for initializing, interacting, and managing chat rooms. Developers can easily customize it by adding features like a rich text editor or enhancing the UI to support file uploads and media previews. These customizations involve integrating third-party libraries and ensuring that both frontend and backend components are updated to handle new content types.


============
# Appendixes:
============

## Key Packages and Dependencies

### 1. Internal Packages

- **`Chat.tsx`**
  - The main UI component for handling chat functionalities, extends the `ChatController`.

- **`ChatController.tsx`**
  - Contains the business logic and API interaction methods for the chat functionalities.

- **`ViewChat.tsx`**
  - Handles the display of a single chat session, showing messages and the message input field.

- **`ViewChatController.tsx`**
  - Manages the logic behind `ViewChat`, including fetching chat history and sending messages.

- **`config.js`**
  - Stores configuration details such as API endpoints and UI text strings.

### 2. External Packages

- **`react-native-vector-icons/Octicons`**
  - Provides vector icons that are used in the UI components, such as buttons or other interactive elements.

- **`react-native`**
  - The primary framework for building mobile applications using React.

### 3. Key Dependencies (from `package.json`)

- **`jest`** (`^26.6.1`)
  - **Purpose**: A testing framework used to run unit and integration tests within the project.
  
- **`ts-jest`** (`^25.2.0`)
  - **Purpose**: A Jest transformer specifically for handling TypeScript files in tests.

- **`@typescript-eslint/eslint-plugin`** (`2.20.0`)
  - **Purpose**: An ESLint plugin that provides linting rules specific to TypeScript, ensuring code quality and adherence to best practices.

- **`eslint`** (`6.8.0`)
  - **Purpose**: A tool for identifying and reporting on patterns in JavaScript and TypeScript, helping to maintain consistent code quality.

- **`babel-eslint`** (`10.0.3`)
  - **Purpose**: A parser that allows ESLint to lint all Babel code, enabling the use of modern JavaScript syntax and features.

- **`enzyme`** (`^3.11.0`)
  - **Purpose**: A testing utility for React that allows for shallow rendering and manipulation of React components during tests.

- **`husky`** (`^4.2.3`)
  - **Purpose**: A tool to manage Git hooks, ensuring that tasks like linting and testing are performed before code is committed.

- **`prettier-eslint-cli`** (`5.0.0`)
  - **Purpose**: A command-line tool that formats code using Prettier and then applies ESLint fixes to ensure consistent styling and adherence to linting rules.

- **`typescript`** (`4.1.3`)
  - **Purpose**: A superset of JavaScript that adds static types, helping catch errors early and improving code maintainability.

- **`@types/react`** and **`@types/react-native`**
  - **Purpose**: Type definitions for React and React Native, providing TypeScript support for React components and APIs.

### 4. Development Dependencies

- **`eslint-config-airbnb`** (`18.0.1`)
  - **Purpose**: Provides Airbnb's ESLint configuration, which is widely regarded as a standard for JavaScript and React code quality.

- **`jest-enzyme`** (`7.1.2`)
  - **Purpose**: Extends Jest with Enzyme matchers, making it easier to test React components.

- **`eslint-plugin-react`** (`7.18.3`)
  - **Purpose**: An ESLint plugin that provides React-specific linting rules, ensuring that React code follows best practices.

- **`eslint-plugin-react-native`** (`3.8.1`)
  - **Purpose**: Provides React Native specific linting rules, ensuring that mobile-specific code adheres to best practices.

### Summary

This React package relies on a combination of internal and external packages to provide chat functionality in a React Native environment. Key dependencies include testing tools like Jest and Enzyme, linting tools like ESLint and Prettier, and TypeScript for static typing. The package is designed to maintain high code quality and consistency while providing a robust chat interface.
