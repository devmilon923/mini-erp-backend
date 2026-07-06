import mongoose from "mongoose";

export const handlerDuplicateError = (
  err: mongoose.Error.ValidationError,
): string => {
  const regex = /"(.*?)"/;
  const matches = err.message.match(regex);
  return `${matches![1]} is already exists!`;
};
