## Backend – Prompt Manager API

This is a simple RESTful API built with **Node.js + Express** and connected to **MongoBD** for managing AI prompts.

### Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv

---

## How to Run the Backend

1. Go to the `backend` directory:

   ```bash
   cd backend

2. Install dependencies
    
    ```bash
   npm install

3. Create a .env file with MongoDB URI
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

4. Start the server
    
    ```bash
   node server.js

## API Usage

### Base Url

http://localhost:3001

### Get /prompts
Returns a list of all prompts
    ```bash
    curl http://localhost:3001/prompts

### Get /prompts
Returns the prompt with the given ID
    ```bash
    curl http://localhost:3001/prompts

### POST /prompts
Creates a new prompt

    curl -X POST http://localhost:3001/prompts \
        -H "Content-Type: application/json" \
        -d '{
            "title": "Moderation Prompt",
            "content": "Check the message for inappropriate content.",
            "tags": ["moderation", "chatbot"],
            "status": "inactive"
        }'

### PATCH /prompts/:id
Updates the content or status of a prompt
    
    curl -X PATCH http://localhost:3001/prompts/1 \
        -H "Content-Type: application/json" \
        -d '{
            "status": "active"
    }'


## Error Handling
| Status | Message                 | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| 404    | `Prompt not found`      | Prompt with the given ID not found |
| 400    | `Invalid input`         | Missing or malformed data          |
| 500    | `Internal Server Error` | File read/write error or crash     |


## Data structure
Each prompt stored in database has the following structure:

{
  "_id": "ObjectId",
  "title": "Prompt title",
  "content": "Prompt full text",
  "tags": ["chatbot", "AI"],
  "status": "active" | "inactive",
  "created_at": "2025-07-23T16:00:00Z"
}
