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

