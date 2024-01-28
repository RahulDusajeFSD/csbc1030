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
  const posts = await sm_model.getPostsOfUser(req.user.id);
  res.send({posts});
  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function getCommentsOfPost(req, res){
  try{
    const comments = await sm_model.getCommentsOfPost(req.user.id);

    console.log('comments' + comments);
    res.send({comments});
  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function createNewUserPost(req, res){
  try{
    console.log(req.user.userId);
await sm_model.createNewPost(req.user.id, req.body);


    res.send("Successfully created a post");
  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function updatePost(req, res){

  try{
 await sm_model.updatePost(req.user.id, req.body);

 res.send(`Successfully updated a post with post id - ${req.body.id}`);

  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}

async function updateComment(req, res){

  try{
    await sm_model.updateComment(req.user.id, req.body);
   
    res.send(`Successfully updated a comment with comment id - ${req.body.id}`);
   
     }catch(error){
       console.error(error.message);
       res.status(500).send(`Error: ${error.message}`);
     }
}

async function deleteComment(req, res){
  try{

    await sm_model.deleteComment(req.user.id, req.body.commentId);

    res.send(`Successfully deleted a comment with comment id - ${req.body.commentId}`);

  }catch(error){
    console.error(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}


module.exports ={getUsers, getPostsOfUser, getCommentsOfPost, createNewUserPost, updatePost, updateComment, deleteComment};