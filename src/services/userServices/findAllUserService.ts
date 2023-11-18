import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { User as IUser } from "../../models/User/types";

const findAllUserService = async (): Promise<IUser[]> => {
  try {
    const users = await User.find({});

    return users;
  } catch (error) {
    console.error(error);

    throw new AppError("An error occurred while searching for all users");
  }
};

export default findAllUserService;
