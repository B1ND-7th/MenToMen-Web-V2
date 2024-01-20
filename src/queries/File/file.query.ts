import { useMutation } from "react-query";
import fileRepository from "@/src/repositories/File/file.repository";

export const useFileUploadMutation = () => {
  const mutation = useMutation((file: FormData) =>
    fileRepository.postFileUpload(file)
  );
  return mutation;
};
