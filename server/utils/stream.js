const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET ;

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

async function upsertStreamUser({id, name, image}) {
  try {
    const response = await streamClient.upsertUser({
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

async function generateStreamToken({id}) {
  try {
    const userId = id.toString()
    return streamClient.createToken(userId);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

module.exports = { upsertStreamUser,generateStreamToken };