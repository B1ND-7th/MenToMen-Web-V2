import { Dispatch, SetStateAction } from "react";
import { useGetNoticeList } from "../../../queries/Notice/notice.query";
import * as S from "./style";
import profile from "../../../assets/images/aprofile.png";
import { IsActiveDetailAtom } from "../../../stores/Detail/detail.store";
import { useSetRecoilState } from "recoil";
import { PostIdAtom } from "../../../stores/common/common.store";

interface Props {
  setIsActiveNotice: Dispatch<SetStateAction<boolean>>;
}

const NoticeItem = ({ setIsActiveNotice }: Props) => {
  const { data: noticeList } = useGetNoticeList({ suspense: true });
  const setIsActiveDetail = useSetRecoilState(IsActiveDetailAtom);
  const setPostId = useSetRecoilState(PostIdAtom);

  const handleNoticeItemClick = (postId: number) => {
    setIsActiveNotice(false);
    setIsActiveDetail(true);
    setPostId(postId);
  };

  return (
    <>
      {noticeList?.data.length!! > 0 ? (
        <S.NoticeBox>
          {noticeList?.data.map((item, idx) => (
            <li key={idx} onClick={() => handleNoticeItemClick(item.postId)}>
              <S.UserInfo>
                <S.NewIcon>{item.noticeStatus === "EXIST" && "·"}</S.NewIcon>
                <img
                  src={profile || item.senderProfileImage}
                  alt="이미지 없음"
                />
                <div>
                  <S.Name>{item.senderName}</S.Name>
                  <S.NoticeDate>3일전</S.NoticeDate>
                </div>
              </S.UserInfo>

              <S.Comment>{item.commentContent}</S.Comment>
            </li>
          ))}
        </S.NoticeBox>
      ) : (
        <S.NoneNoticeText>알림이 없습니다.</S.NoneNoticeText>
      )}
    </>
  );
};

export default NoticeItem;
