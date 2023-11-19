import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import { CreateLink, Link as ILink } from "../../models/Link/types";

const createLinkService = async (link: CreateLink): Promise<ILink> => {
  try {
    const newLink = link;

    const linkCreated = await new Link(newLink).save();

    return linkCreated;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred while creating a new link");
  }
};

export default createLinkService;
