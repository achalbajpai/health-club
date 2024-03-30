import { prisma } from "../index.js";
import { fixedDateToPrisma } from "../utils/fixDateTime.js";
import { GeneralError } from "../utils/generalError.js";
import { postSchema } from "../utils/zodSchemas.js";
import { z } from "zod";
export const createPost = async (
  authorUsername: string,
  { title, description, tag }: z.infer<typeof postSchema>,
  image: string | null
) => {
  const author = await prisma.user.findUnique({
    where: {
      username: authorUsername,
    },
  });
  if (!author) throw new GeneralError(404, "User not found.");
  const post = await prisma.post.create({
    data: {
      description,
      authorId: author.id,
      title,
      tag,
      image,
      postedOn: fixedDateToPrisma(new Date()),
    },
  });
  if (!post)
    throw new GeneralError(409, "Some error occured while posting the post.");
  return post;
};

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
          username: true,
          profilePic: true,
          profession: true,
        },
      },
      upVoters: {
        select: {
          id: true,
        },
      },
      comments: true,
    },
  });
  if (!posts) throw new GeneralError(404, "Posts not found.");
  const postsAuthors = posts.map((post) => {
    const { ...authorDetails } = post.author;
    const numberOfComments = post.comments.length;
    const { author, authorId, comments, ...remainingpost } = post;
    return { ...remainingpost, authorDetails, numberOfComments };
  });
  return postsAuthors;
};

export const upVotePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      upVoters: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!post) throw new GeneralError(404, "Post not found.");
  const alreadyUpvoted = post.upVoters.find((upvoter) => upvoter.id === userId);
  if (alreadyUpvoted) throw new GeneralError(400, "Already Upvoted");
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      upVoters: {
        connect: [{ id: userId }],
      },
      upvotes: {
        increment: 1,
      },
    },
  });
  if (!updatedPost) throw new GeneralError(500, "Update failed.");
  return { updatedPost, message: "Upvoted Successfully!" };
};

export const unVotePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      upVoters: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!post) throw new GeneralError(404, "Post not found.");
  const alreadyUpvoted = post.upVoters.find((upvoter) => upvoter.id === userId);
  if (!alreadyUpvoted) throw new GeneralError(400, "Already Unvoted!");
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      upvotes: {
        decrement: 1,
      },
      upVoters: {
        disconnect: [{ id: userId }],
      },
    },
  });
  if (!updatedPost) throw new GeneralError(500, "Update failed.");
  return { updatedPost, message: "Unvoted Successfully!" };
};
