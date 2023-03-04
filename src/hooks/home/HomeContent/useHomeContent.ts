import { useRecoilState } from "recoil";
import { ImgList, Text, Tag, Cnt } from "../../../recoil/home/HomeAtom";
import { usePostMySubmit } from "../../../querys/list/list.query";
import { QueryClient } from "react-query";
import { customAxios } from "../../../lib/axios/customAxios";
import { useCallback } from "react";
import { PostSubmitType } from "../../../types/list/list.type";
import {
  Dev,
  DevOrigin,
} from "../../../components/main/Home/HomeMentoreqRuest/devlogo";

export const useHomeContent = () => {
  const [text, SetText] = useRecoilState<string>(Text);
  const [imgList, SetImgList] = useRecoilState<string[]>(ImgList);
  const [tag, SetTag] = useRecoilState<string>(Tag);
  const [cnt, SetCnt] = useRecoilState<number>(Cnt);

  const MyPostMutation = usePostMySubmit();
  const queryClient = new QueryClient();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      SetText(e.target.value);
    },
    [SetText]
  );

  const onSubmit = useCallback(
    (arr: string[]) => {
      const answer = window.confirm("글을 올리시겠습니까?");
      if (answer === true) {
        const data: PostSubmitType = {
          content: text,
          imgUrls: arr,
          tag: tag.toUpperCase(),
        };
        MyPostMutation.mutate(data, {
          onSuccess: () => {
            window.alert("글이 등록되었습니다!");
            queryClient.invalidateQueries("/post/submit");
          },
          onError: (err: any) => {
            window.alert("글을 등록하지 못했습니다!");
            console.log(err);
          },
          onSettled: () => {
            SetCnt(0);
            SetTag("");
            SetText("");
            SetImgList([]);
            for (let i = 0; i < 5; i++) {
              Dev[i].logo = DevOrigin[i].logo;
            }
          },
        });
      }
    },
    [text, imgList, tag]
  );

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        if (text !== "" && tag !== "") {
          const arr: string[] = [];
          const formData = new FormData();
          try {
            if (imgList.length !== 0) {
              for (let i = 0; i < imgList.length; i++) {
                formData.append("file", imgList[i]);
              }
              const { data } = await customAxios.post("/file/upload", formData);
              data.data.forEach((value: string) => {
                arr.push(value);
              });
            }
            console.log(arr);
            onSubmit(arr);
          } catch (e: any) {
            console.log(e);
          }
        } else window.alert("제대로 입력해주세요!");
      }
    },
    [imgList, onSubmit, tag, text]
  );

  return { onChange, onKeyDown, text };
};
