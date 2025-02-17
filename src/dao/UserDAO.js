import User from "../models/User.js";

class UserDAO {
  static async findByEmail(email) {
    return await User.findOne({ email });
  }

  static async create(userData) {
    return await User.create(userData);
  }
}

export default UserDAO;
