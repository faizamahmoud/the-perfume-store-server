const app = require("./utils/server");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
