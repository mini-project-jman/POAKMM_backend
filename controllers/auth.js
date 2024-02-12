const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const mongoose = require('mongoose')

const conn_str = "mongodb+srv://aiarjun027:arjun1234@cluster0.beh4ixw.mongodb.net/POAKMM?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(()=> console.log("Connected Successsfully")).catch((err)=> console.log(err))
const userSchema = new mongoose.Schema(
    {
        email:String,
        username:String,
        password:String
    }
)
const users = new mongoose.model("user_auths",userSchema)

const login = async (req,res) => {
    const data = await users.find()
    // Read username and password from request body
    console.log(req.body)
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = await data.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
}

const prot = (req,res) => {
    if (req.user){
        console.log(req.user);
    }
    res.send("in")
}

module.exports = {
    login,
    prot
}