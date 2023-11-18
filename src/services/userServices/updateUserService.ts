import { AppError } from "../../helpers/errors/AppError";
import User from "../../models/User";
import { UpdateUser, User as IUser } from "../../models/User/types";

const updateUserService = async (
  userFields: UpdateUser,
  id: string
): Promise<IUser> => {
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: id }, userFields, {
      new: true,
    });

    if (!userUpdated) {
      throw new AppError("User not found");
    }

    return userUpdated;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred while updating a user");
  }
};

export default updateUserService;
