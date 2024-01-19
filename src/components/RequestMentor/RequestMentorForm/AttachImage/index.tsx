import upload from "@/public/icons/RequestMentor/upload.svg";
import cancel from "@/public/icons/RequestMentor/cancel.svg";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import * as S from "../style";

interface Props {
  imgUrl: string[];
  setImgUrl: Dispatch<SetStateAction<string[]>>;
  selectFileImage: RefObject<HTMLInputElement>;
  handleFileUploadClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUploadDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const RequestMentorFormAttachImage = ({
  imgUrl,
  setImgUrl,
  selectFileImage,
  handleFileUploadClick,
  handleFileUploadDrop,
}: Props) => {
  const [isDrop, setIsDrop] = useState(false);

  return (
    <S.AttachImageBox>
      <S.AttachImageWrap
        isDrop={isDrop}
        onDrop={(e) => {
          handleFileUploadDrop(e);
          setIsDrop(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDrop(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDrop(false);
        }}
      >
        <input
          type="file"
          onChange={handleFileUploadClick}
          ref={selectFileImage}
          multiple
          accept=".jpeg, .jpg, .png"
        />
        <button onClick={() => selectFileImage.current?.click()}>
          <S.UploadIcon src={upload} alt="업로드" />
          <p>이미지 선택</p>
        </button>
        <S.AttachImageText>
          또는 해당 박스 안에 이미지를 드래그 하세요!
        </S.AttachImageText>
      </S.AttachImageWrap>

      {imgUrl.length > 0 && (
        <S.PreviewAttachImageBox>
          {imgUrl.map((item, idx) => (
            <S.PreviewImageWrap key={idx}>
              <S.CancelPreviewImage
                onClick={() =>
                  setImgUrl((prev) => prev.filter((img) => img !== item))
                }
              >
                <S.CancelIcon src={cancel} alt="취소" />
              </S.CancelPreviewImage>
              <S.PreviewImage
                src={item}
                width={205}
                height={140}
                alt="미리보기"
              />
            </S.PreviewImageWrap>
          ))}
        </S.PreviewAttachImageBox>
      )}
    </S.AttachImageBox>
  );
};

export default RequestMentorFormAttachImage;
