import Client from '../models/Client.js'

// curl -X POST -H "Content-Type: application/json" -d "{\"to_account_number\":\"4152831396612259\", \"amount\":1000}" http://localhost:3000/api/transfer

export const transfer = async (req, res) => {
    const {client_account, to_account_number, amount} = req.body;
    try {
      const recipient = await Client.findOne({ account_number: to_account_number });
      if (!recipient) return res.status(401).json({ message: 'Invalid account number!' });

      const sender = await Client.findOne({ account_number: client_account });
      if (parseFloat(sender.account_balance) < amount) return res.status(402).json({ message: 'insufficient funds!' });

      sender.account_balance = parseFloat(sender.account_balance) - Number(amount);
      recipient.account_balance = parseFloat(recipient.account_balance) + Number(amount);

      await sender.save();
      await recipient.save();

      return res.status(200).json({ message: 'Successful transaction!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};