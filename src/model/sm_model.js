

const { Sequelize } = require('sequelize');
//const { getPostsOfUser } = require('../controller/sm_controller');

const sequelize = new Sequelize('social_media', 'root', 'Planet@1122334455', {
  //host: 'localhost',
  host: 'host.docker.internal',
  dialect: 'mysql', 
});



// Test connectivity with DB
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


async function getUsers() {
  try {
    const results = await sequelize.query('SELECT * FROM users');
    return results[0];
  } catch (error) {
    throw new Error(`Error reading users data: ${error.message}`);
  }
}

async function getPostsOfUser(userId) {
  try{
   // console.log(`query -> select posts.id, posts.title, posts.body from posts inner join users on users.id = posts.userId where posts.userId = ${userId}; `)
    const results = await sequelize.query(`select posts.id, posts.title, posts.body from posts inner join users on users.id = posts.userId where posts.userId = ${userId};`);
   
    
    return results[0];
  }catch(error){
    throw new Error(`Error reading posts of user with userid - ${userId}: ${error.message}`);
  }
}

async function getCommentsOfPost(userId){

  try{
    console.log(userId);
    const getPosts = await getPostsOfUser(userId);

    const getPostsIdOfUser = getPosts.map((item)=>item.id);

    console.log(getPostsIdOfUser);

     const results = await sequelize.query(`select comments.id, comments.name, comments.email, comments.body from comments inner join posts on posts.id = comments.postId where posts
     .id in (${getPostsIdOfUser});`);
   
    //console.log(results)
    return results[0];
  }catch(error){
    throw new Error(`Error reading comments of posts of userId - ${userId}: ${error.message}`);
  }
}

async function createNewPost(userId, postData){
  try{
    console.log(userId);
    const {id, title, body} = postData;


    console.log(`Insert into posts values(${userId}, ${id}, "${title}", "${body}")`)
    await sequelize.query(`Insert into posts values(${userId}, ${id}, "${title}", "${body}")`);

    return "Successfully created a post";
  }catch(error){
    throw new Error(`Error creating posts for user - ${userId}: ${error.message}`);
  }
}


async function updatePost(userId, postData){
  try{
    const {id, title, body} = postData;
    console.log(`Update Posts set title = ${title}, body =${body} where id = ${id} and userId = ${userId}`);
    await sequelize.query(`Update Posts set title = "${title}", body ="${body}" where id = ${id} and userId = ${userId}`);


  }catch(error){
    throw new Error(`Error updating posts for postId - ${id}: ${error.message}`);
  }
}

async function updateComment(userId, commentData){
  try{
    const {postId, id, email, name, body} = commentData;
    console.log(`update comments set name="${name}", email="${email}", body="${body}" where id =${id} and postId = ${postId}`);
    await sequelize.query(`update comments set name="${name}", email="${email}", body="${body}" where id =${id} and postId = ${postId}`);


  }catch(error){
    throw new Error(`Error updating comment for CommentId - ${id}: ${error.message}`);
  }
}

async function deleteComment(userId, commentId){
  try{
    console.log(`Delete from comments where id = ${commentId}`)
    await sequelize.query(`Delete from comments where id = ${commentId}`);
  }catch(error){
    throw new Error(`Error deleting a comment for CommentId - ${commentId}: ${error.message}`);
  }
}

module.exports = { getUsers, testConnection, getPostsOfUser, getCommentsOfPost, createNewPost, updatePost, updateComment, deleteComment };

//update comments set name="updated_comment", email="updated_comment", body="updated_body" where id=1 and postId=1;