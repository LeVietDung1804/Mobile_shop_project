const app = require(`${__dirname}/../app`);
const config = require("config");

const server = app.listen(port = config.get("app.port"), (req, res) => {
    console.log(`server is running on port ${port}`);
});