import React, {
  forwardRef,
  Ref,
  useMemo,
  useState,
  useImperativeHandle,
} from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { Button } from "../../tools/buttons/Button";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import Spinner from "../../tools/spinner/Spinner";
import {
  Brands,
  useUpdateBrandLogo,
} from "../../../services/queries/brandsQueries";

type ImageFile = File & {
  preview: string;
};

export type FilesRef = {
  acceptedFiles: File[];
};

type FormProps = {
  brands?: Brands;
  ref: Ref<FilesRef>;
};

const BrandsPhotoForm: React.FC<FormProps> = forwardRef(({ brands }, ref) => {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { mutateAsync: updateLogo, isPending } = useUpdateBrandLogo();
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImageFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    },
  });

  const previewImage = useMemo(() => {
    if (imageFile) {
      if (acceptedFiles[0]?.name) {
        return imageFile.preview;
      }
    }

    if (brands && brands.logo) {
      return brands.logo;
    }

    return null;
  }, [imageFile, acceptedFiles, brands]);

  const handleSave = async () => {
    if (!brands) return;
    if (acceptedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("logo", acceptedFiles[0]);

    if (location.pathname.includes("brands-manager")) {
      const response = await updateLogo({
        id: brands.id,
        payload: formData,
      });
      if (response.status === 200) {
        navigate({ to: "/brands/brands-manager" });
      }
    }
  };

  const handleDelete = () => {
    if (!brands) return;
    if (!window.confirm("Delete this logo?")) return;

    const formData = new FormData();
    formData.append("image_delete", "true");

    updateLogo({
      id: brands.id,
      payload: formData,
    });
  };

  const handleCancel = () => {
    navigate({ to: "/brands/brands-manager" });
  };

  useImperativeHandle(ref, () => ({
    acceptedFiles,
  }));

  return (
    <div className="bg-white self-start max-sm:w-full">
      <div className="px-8 py-4 border-b border-b-gray-300">
        Your Brand Logo
      </div>

      <div className="p-8 flex flex-col gap-y-4">
        <div className="flex gap-x-4 items-center">
          {previewImage ? (
            <div className="rounded-full h-12 w-12 overflow-hidden">
              <img
                src={previewImage}
                className="h-full w-full object-cover"
                onLoad={() => {
                  URL.revokeObjectURL(previewImage);
                }}
              />
            </div>
          ) : (
            <UserCircleIcon
              className="h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          )}
          <div className="flex flex-col gap-0.5">
            <span>Upload your Logo</span>
            {brands && (
              <Button
                variant={"noBorder"}
                className="p-0 h-fit self-start text-red-500 text-xs"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        <div
          {...getRootProps()}
          className="p-8 justify-center border border-dashed border-grBlue-dark"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col gap-4 justify-center items-cemter">
            <div className="p-2 w-fit self-center rounded-full ring-1 ring-gray-200">
              <ArrowUpTrayIcon className="h-4 w-4 text-grBlue-dark" />
            </div>
            <div className="text-center text-sm">
              <span className="text-grBlue-dark font-medium">
                Click to upload{" "}
              </span>
              <span className="font-medium text-gray-500">
                or drag and drop
                <br />
                SVG, PNG, JPG or GIF
                <br />
                {"(max: 800x800 px)"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          {brands && (
            <>
              <Button onClick={handleCancel} type="button" variant="noBorder">
                Cancel
              </Button>
              <Button
                type="button"
                disabled={acceptedFiles.length === 0 || isPending}
                onClick={handleSave}
              >
                {isPending ? (
                  <>
                    Saving <Spinner />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default BrandsPhotoForm;
