import Client from '../models/Client.js'

// curl -X POST -H "Content-Type: application/json" -d "{\"to_account_number\":\"4152831396612259\", \"amount\":1000}" http://localhost:3000/api/transfer

export const transfer = async (req, res) => {
    const {to_account_number, amount} = req.body;
    var query = {account_number: to_account_number}
    var newvalues = { $set: {account_balance: amount} };
    try {
      const recipient = await Client.findOne({ account_number: to_account_number });
      if (!recipient) return res.status(401).json({ message: 'Invalid account number!' });

      const response = await Client.updateOne(query, newvalues);
      if(!response) return res.status(402).send('Something went wrong!');
      else res.send('Successful transaction!');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Ruta para la transferencia
// app.post('/transfer', async (req, res) => {
//   try {
//     const { to_account_number, amount } = req.body;

//     // Verificar si el número de cuenta existe en la base de datos
//     const recipient = await Client.findOne({ account_number: to_account_number });
//     if (!recipient) {
//       return res.status(401).json({ message: 'Número de cuenta inválido' });
//     }

//     // Realizar la transferencia actualizando el saldo del cliente
//     const sender = await Client.findOne(); // Aquí debes implementar la lógica para obtener el cliente actualmente logueado
//     if (sender.account_balance < amount) {
//       return res.status(401).json({ message: 'Fondos insuficientes' });
//     }

//     sender.account_balance -= amount;
//     recipient.account_balance += amount;

//     await sender.save();
//     await recipient.save();

//     return res.status(200).json({ message: 'Transferencia exitosa' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

