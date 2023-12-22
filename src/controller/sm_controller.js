const sm_model = require('../model/sm_model');

async function getUsers(req, res) {       
  try {
    const usersData = await sm_model.getUsers();  
    res.send({ usersData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function getPostsOfUser(req, res){
  try{
  const posts = await sm_model.getPostsOfUser(req.user.userId);
  res.send({posts});
  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function getCommentsOfPost(req, res){
  try{
    const comments = await sm_model.getCommentsOfPost(req.user.userId);

    console.log('comments' + comments);
    res.send({comments});
  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

module.exports ={getUsers, getPostsOfUser, getCommentsOfPost};