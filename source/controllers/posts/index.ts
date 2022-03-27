import logging from "../../config/logging";
import { Request, Response } from "express";
import { IPost } from "../../interfaces/post.interface";
import Post from "../../models/post.model";
import { POST_NAMESPACE } from "../../utils/constants";
import utils from "../../utils";

import { io } from "../../server";

const create = async (req: Request, res: Response) => {
  try {
    const {
      event_id,
      event_date,
      page_title,
      page_description,
      page_tags,
      user_id,
      user_joined,
    } = req.body;

    const payload: IPost = {
      id: event_id,
      created_at: event_date,
      page: {
        title: page_title,
        description: page_description,
        tags: page_tags.map((e: any) => e),
      },
      user: {
        id: user_id,
        created_at: user_joined,
      },
    };

    await Post.create(payload);

    let data = await Post.find({}).sort({ created_at: -1 });

    io.emit("fetch", { data });
    return utils.jsonResponse(res, true, 201, "Post created successfully", {
      data,
    });
  } catch (error: any) {
    logging.error(POST_NAMESPACE, `${error.message}`);
    return utils.jsonResponse(res, false, 500, error.message, {});
  }
};

const get = async (req: Request, res: Response) => {
  try {
    let data = await Post.find({}).sort({ created_at: -1 });

    return utils.jsonResponse(
      res,
      true,
      200,
      "All posts fetched successfully",
      {
        data,
      }
    );
  } catch (error: any) {
    logging.error(POST_NAMESPACE, `${error.message}`);
    return utils.jsonResponse(res, false, 500, error.message, {});
  }
};

export default {
  create,
  get,
};
