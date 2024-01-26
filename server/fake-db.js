const Rental = require("./routes/controllers/models/rental");
const User = require("./routes/controllers/models/user");
const Payment = require("./routes/controllers/models/payment");
const Notification = require("./routes/controllers/models/notification");
const Data = require("./template-data/db-data.json");

class FakeDb {
  constructor() {
    this.rentals = Data.rentals;
    this.users = Data.users;
  }
  async cleanDb() {
    await Rental.deleteMany({});
    await User.deleteMany({});
    await Payment.deleteMany({});
    await Notification.deleteMany({});
  }
  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    const user3 = new User(this.users[2]);
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user3;
      user3.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
    user3.save();
  }
  async seeDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
