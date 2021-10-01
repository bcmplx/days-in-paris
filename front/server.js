const express = require('express');

const app = express();
const port = 8012;
app.use(express.static('dist'));
app.listen(port, () => console.log(`Server ${port}  Successfully opened!`));
