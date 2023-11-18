import bcrypt from "bcryptjs";
import { CreateUser, User as IUser } from "../../models/User/types";
import User from "../../models/User";
import { AppError } from "../../helpers/errors/AppError";

const createUserService = async (user: CreateUser): Promise<IUser> => {
  try {
    const newUser: CreateUser = {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    };

    const userCreated = await new User(newUser).save();

    return userCreated;
  } catch (error) {
    console.error(error);

    throw new AppError("An error occurred while creating a new user");
  }
};

export default createUserService;
