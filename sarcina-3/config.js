const config = {
    url: "https://simpalsid.com/user/login",
    testUsers: [
        { username: "kennyadv03@gmail.com", password: "Parolamea123&", email: "kennyadv03@gmail.com" },
        { username: "invaliduser@", password: "WrongPassword123", email: "invaliduser@" },
        { username: "user@valid.com", password: "ValidPassword123", email: "user@valid.com" }
    ],
    timeout: 5000
};

module.exports = { config };