import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { User as IUser } from "../../models/User/types";

const findOneUserByUsernameService = async (
  username: string
): Promise<IUser | null> => {
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
    });

    return user;
  } catch (error) {
    console.error(error);

    throw new AppError(
      "An error occurred when searching for a user by username"
    );
  }
};

export default findOneUserByUsernameService;
