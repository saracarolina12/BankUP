import app from './app.js'
import './database/db.js'

const port = app.get('port');
app.listen(port, () => console.log(`Express app running on port ${port}!`))