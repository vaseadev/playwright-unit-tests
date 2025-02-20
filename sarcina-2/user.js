const user = {
    firstName: "Vasile",
    lastName: "Vartic",
    email: "testemail@gmail.com",

    isValidEmail() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(this.email);
    },

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

module.exports = { user };