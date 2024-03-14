import { DependencyList, useEffect, useRef, useState } from "react";
import ReactCrop, {
    Crop,
    PixelCrop,
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvas_preview";

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
): Crop => {
    const target = mediaHeight > mediaWidth ? "width" : "height";

    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                [target]: 90, //이미지 크기의 10퍼센트
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
    const RATIO = 1;

    const [imgSrc, setImgSrc] = useState<string>(""); //파일 Data URL 형식 문자 저장
    const [crop, setCrop] = useState<Crop>(); //height, width, x, y, unut 정보 저장
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>(); //이미지 업로드 완료되었을 때 crop 정보(픽셀)
    const [aspect, setAspect] = useState<number | undefined>(RATIO); //crop 비율

    //아직 왜 있는지 모르겠음
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null); //미리보기 ref

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
            const crop = centerAspectCrop(width, height, aspect);
            setCrop(crop);
            // setCompletedCrop(crop as PixelCrop);
        }
    };

    const onChange = (pixelCrop: PixelCrop, percentCrop: Crop) => {
        setCrop(percentCrop);
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                pixelCrop,
                scale,
                rotate
            );
        }
    };

    const onComplete = (c: PixelCrop) => {
        //픽셀로된 정보 업데이트
        setCompletedCrop(c);
    };

    // useDebounceEffect(
    //     async () => {
    //         if (
    //             completedCrop?.width &&
    //             completedCrop?.height &&
    //             imgRef.current &&
    //             previewCanvasRef.current
    //         ) {
    //             canvasPreview(
    //                 imgRef.current,
    //                 previewCanvasRef.current,
    //                 completedCrop,
    //                 scale,
    //                 rotate
    //             );
    //         }
    //     },
    //     100,
    //     [completedCrop, scale, rotate]
    // );

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
                    onChange={onChange}
                    onComplete={onComplete}
                >
                    <img
                        ref={imgRef}
                        alt="crop_image"
                        src={imgSrc}
                        // style={{ width: 600, height: 700 }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {completedCrop && (
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: "1px solid black",
                            objectFit: "contain",
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList
) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn();
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, [fn, ...(deps || [])]);
}
