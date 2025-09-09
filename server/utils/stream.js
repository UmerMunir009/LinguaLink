const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET ;

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

async function upsertStreamUser({id, name, image}) {
  try {
    const response = await serverClient.upsertUser({
      id: id,       
      name: name,      
      image: image,     
    });
    console.log(`Stream user created for ${id}`)
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

module.exports = { upsertStreamUser };