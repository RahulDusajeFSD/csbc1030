var express = require('express');

var router = express.Router();

const fs = require('fs');

const filePath = __dirname + '/' + '../files/users.json';


const usersData = fs.readFileSync(filePath, 'utf-8');

router.get('/', (req,res)=>{

    
    res.send({
        "usersData": JSON.parse(usersData)
    });

})

router.get('/:id', (req,res)=>{
    const userData = JSON.parse(usersData).find((item)=> item.userId == req.params.id);
    res.send({userData})
})

module.exports = router;
