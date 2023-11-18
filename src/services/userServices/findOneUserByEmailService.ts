import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { User as IUser } from "../../models/User/types";

const findOneUserByEmailService = async (
  email: string
): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    console.error(error);

    throw new AppError("An error occurred when searching for a user by email");
  }
};

export default findOneUserByEmailService;
