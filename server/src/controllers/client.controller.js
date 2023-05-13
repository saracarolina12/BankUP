import Client from '../models/Client.js'

export const getClientInfo = async (req,res)=>{
    const {account_number} = req.params; 
    var query = { account_number: account_number}
    try {
        const data = await Client.find(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    //test -: curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"UliseGallardo\",\"password\":\"password123\"}" http://localhost:3000/api/client/login
    //test +: curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"UlisesGallardo\",\"password\":\"password123\"}" http://localhost:3000/api/client/login
    const {username, password} = req.body;
    var query = {username: username, password: password}
    try {
        const response = await Client.findOne(query);
        if(!response) return res.status(401).send('Invalid username or password');
        else res.send('Login successful');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

