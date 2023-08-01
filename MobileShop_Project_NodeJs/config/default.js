module.exports = {
    app: {
        router: `${__dirname}/../src/routers/web`,
        static: `${__dirname}/../src/public/`,
        port: 3000,
        view_folder: `${__dirname}/../src/apps/views/`,
        view_engine: "ejs",
        secret_key: "mobileshop",
        tmp: `${__dirname}/../src/tmp`
    },
    mail: {
        post: 587,
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: "bachsau1597@gmail.com",
            pass: "wqnqpowzcmsckvdx"
        }
    }
};