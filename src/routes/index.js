module.exports = (app) => {
    app.use("/auth", require("./auth"))
    app.use("/quiz", require("./quiz"))
    app.use("/", require("./dashboard"))
}