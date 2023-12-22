

const { Sequelize } = require('sequelize');
//const { getPostsOfUser } = require('../controller/sm_controller');

const sequelize = new Sequelize('social_media', 'root', 'Planet@1122334455', {
  host: 'localhost',
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



module.exports = { getUsers, testConnection, getPostsOfUser, getCommentsOfPost };
