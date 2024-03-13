import { useEffect, useState } from "react";
import ReactCrop, {
    Crop,
    PixelCrop,
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
): Crop => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
};

export default function Cropper() {
    const [imgSrc, setImgSrc] = useState<string>(""); //파일 Data URL 형식 문자 저장
    const [crop, setCrop] = useState<Crop>(); //height, width, x, y, unut 정보 저장
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>(); //이미지 업로드 완료되었을 때 crop 정보(픽셀)
    const [aspect, setAspect] = useState<number | undefined>(16 / 9); //crop 비율

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                //파일 Data URL 형식 문자 저장
                setImgSrc(reader.result?.toString() || "");
            });
            //단일 파일 Data URL 형식의 문자열로 읽기
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    /**
     * 이미지 로드가 완료되었을 때 crop 크기 계산
     */
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget; //현재 이미지 크기
            setCrop(centerAspectCrop(width, height, aspect));
        }
    };

    const onChange = (_: Crop, percentCrop: Crop) => {
        setCrop(percentCrop);
    };

    const onComplete = (c: PixelCrop) => {
        //픽셀로된 정보 업데이트
        setCompletedCrop(c);
    };

    useEffect(() => {
        console.log("2222222", crop);
    }, [crop]);

    return (
        <div>
            <input
                type="file"
                accept=".png,.gif,.jpg,.jpeg,.jpe,.jfif,.bmp"
                onChange={onSelectFile}
            />
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    aspect={aspect}
                    minHeight={100}
                    onChange={onChange}
                    onComplete={onComplete}
                >
                    <img
                        alt="crop_image"
                        src={imgSrc}
                        style={{ width: 600, height: 700 }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
        </div>
    );
}
