import Client from '../models/Client.js'

export const getClientInfo = async (req,res)=>{
    const {account_number} = req.params; 
    var query = { account_number: account_number}
    try {
        const data = await Client.find(query);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const {username, password} = req.body;
    var query = {}
    try {
        const response = await Client.find(query);
    } catch (error) {
    }
    
};

