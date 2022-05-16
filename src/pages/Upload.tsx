import { createRef, useEffect, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { Category, getCategories } from "@/api/category";
import Input, { FileInput, SelectList, TextArea } from "@/components/Input";
import { PhotoUpload, uploadPhoto } from "@/api/photo";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/auth";

interface UploadProps {
  navigate: NavigateFunction;
}

function Upload(props: UploadProps) {
  const { user } = useAuth();
  const fileInputEl = createRef<FileInput>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    getCategories().then((newCategories) => {
      // Set categories that isn't folder
      setCategories(
        newCategories.filter((category) => category.type !== "folder")
      );
      setIsLoaded(true);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { navigate } = props;

    if (!fileInputEl.current) {
      return;
    }
    const file = fileInputEl.current.state.files?.[0];

    if (!file) {
      setError(new Error("No file selected."));
      return;
    }

    // If file isn't an image, throw error
    if (!file.type.startsWith("image/")) {
      setError(new Error("File must be an image"));
      return;
    }

    if (title && description && user) {
      const categoryIds = selectedCategories.map((category) => category.id);
      const data: PhotoUpload = {
        title,
        description,
        file,
        userId: user.id,
        categories: categoryIds
      };

      uploadPhoto(data).then((response) => {
        if (response) {
          navigate(`/photo/${response.id}`);
        } else {
          navigate("/");
        }
      });
    } else {
      setError(new Error("Title and description required."));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // If file isn't an image, throw error
      if (!file.type.startsWith("image/")) {
        setError(new Error("File must be an image"));
        return;
      }
      setFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <main className="flex flex-col min-h-screen py-5 max-w-3xl mx-auto px-4">
      <header className="mb-4">
        <Link to="/" className="material-icons mb-5">
          arrow_back
        </Link>
        <h1 className="font-semibold text-2xl">Upload</h1>
      </header>
      <main className="flex-1">
        {error && <div>Error: {error.message}</div>}
        {!isLoaded && <Loading className="flex-1" />}
        {isLoaded && (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <FileInput
              type="file"
              id="file"
              ref={fileInputEl}
              accept="image/*"
              onChange={handleFileChange}
            >
              {!fileUrl ? (
                "Upload image"
              ) : (
                <img
                  className="h-16 w-16 mb-2"
                  src={fileUrl}
                  alt="Preview of upload"
                />
              )}
            </FileInput>
            <div className="mb-2">
              <label className="text-sm" htmlFor="title">
                Title
                <Input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  id="title"
                  name="title"
                  className="w-full"
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="description">
                Description
                <TextArea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  id="description"
                  name="description"
                  className="w-full h-28"
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="categories">
                Categories
              </label>
              <SelectList
                id="categories"
                className="w-full max-h-72 overflow-y-scroll"
                options={categories}
                selected={selectedCategories}
                searchable
                // @ts-ignore
                setSelected={(selected: Category[]) =>
                  setSelectedCategories(selected)
                }
              />
            </div>
            <Input type="submit" value="Upload" />
          </form>
        )}
      </main>
    </main>
  );
}

export default Upload;
