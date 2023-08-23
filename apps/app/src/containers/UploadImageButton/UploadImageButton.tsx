import { violetDark } from '@radix-ui/colors';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

type UploadImageButtonProps = {
  onImageUploaded?: (url: string) => void;
};

export const UploadImageButton = (props: UploadImageButtonProps) => {
  const { onImageUploaded } = props;
  const [fileInfo, setFileInfo] = useState(null);
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'dy6dehxix',
        uploadPreset: 'nt12lmzm',
      },
      (error: Error, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);

          onImageUploaded?.(result.info.secure_url);
          setFileInfo(result.info);

          document.getElementById('uploaded-image')!.setAttribute('src', result.info.secure_url);
        }
      },
    );

    setWidget(widget);
  }, []);

  return (
    <>
      <UploadButton
        onClick={() => {
          if (!widget) {
            return;
          } else {
            widget!.open();
          }
        }}
      >
        <label>Thêm ảnh</label>
      </UploadButton>
      <Image $hasSrc={!!fileInfo} />
    </>
  );
};

const UploadButton = styled.div`
  padding: 8px 16px;
  background-color: ${violetDark.violet10};
  border-radius: 8px;
  width: fit-content;
  color: white;
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

const ShowImageStyle = css`
  height: 300px;
  outline: 1px gray solid;
  padding: 4px;
`;

const Image = styled.img.attrs({ id: 'uploaded-image' })<{ $hasSrc?: boolean }>`
  ${({ $hasSrc }) => ($hasSrc ? ShowImageStyle : '')}
  padding: 4px;
  margin-top: 18px;
  border-radius: 16px;
  object-fit: cover;
  object-position: center;
`;
