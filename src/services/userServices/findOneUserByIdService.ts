import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { User as IUser } from "../../models/User/types";

const findOneUserByIdService = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    console.error(error);

    throw new AppError("An error occurred when searching for a user by id");
  }
};

export default findOneUserByIdService;
