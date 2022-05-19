import { createRef, useEffect, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { Category, getCategories } from "@/api/category";
import Input, { FileInput, SelectList, TextArea } from "@/components/Input";
import { PhotoUpload, uploadPhoto } from "@/api/photo";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/auth";
import { useAlert } from "@/contexts/alert";

interface UploadProps {
  navigate: NavigateFunction;
}

function Upload(props: UploadProps) {
  const { user } = useAuth();
  const { addAlert } = useAlert();
  const fileInputEl = createRef<FileInput>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const [count, setCount] = useState<number>(5);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    getCategories().then((newCategories) => {
      // Change name of categories to parent category name + child category name and only keep child category
      setCategories(
        newCategories
          .map((cat) => {
            if (cat.parentId) {
              const newCat = { ...cat };
              const parentCategory = newCategories.find(
                (c) => c.id === cat.parentId
              );
              if (parentCategory) {
                newCat.name = `${parentCategory.name} / ${cat.name}`;
              }
              return newCat;
            }
            return cat;
          })
          .filter((cat) => cat.type !== "folder")
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

    if (title && user) {
      const categoryIds = selectedCategories.map((category) => category.id);
      const data: PhotoUpload = {
        title,
        description,
        file,
        userId: user.id,
        categories: categoryIds,
        useCount: isOwned ? null : count,
        owned: isOwned
      };

      uploadPhoto(data).then((response) => {
        if (response) {
          navigate(`/photo/${response.id}`);
        } else {
          navigate("/");
        }
      });
    } else {
      setError(new Error("Title required."));
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

  useEffect(() => {
    if (error) {
      addAlert("error", error.message);
    }
  }, [error]);

  return (
    <main className="flex flex-col min-h-screen py-5 max-w-3xl mx-auto px-4">
      <header className="mb-4">
        <Link to="/" className="material-icons mb-5">
          arrow_back
        </Link>
        <h1 className="font-semibold text-2xl">Upload</h1>
      </header>
      <main className="flex-1">
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
            {/* Is owned checkbox */}
            <div className="flex flex-nowrap justify-between mb-4 h-9">
              <label
                className={`${
                  isOwned ? "text-blue-400" : "text-gray-500"
                } flex flex-nowrap items-center transition-colors whitespace-nowrap`}
                htmlFor="isOwned"
              >
                Is owned
                <button
                  id="isOwned"
                  role="checkbox"
                  type="button"
                  aria-checked={isOwned}
                  className="material-icons ml-2"
                  onClick={() => setIsOwned(!isOwned)}
                >
                  {isOwned ? "check_box" : "check_box_outline_blank"}
                </button>
              </label>
              {!isOwned && (
                <label
                  className="text-sm font-semibold text-gray-500 flex items-center whitespace-nowrap"
                  htmlFor="useCount"
                >
                  {/* The amount of times a photo can be used */}
                  Use count:
                  <Input
                    type="number"
                    id="useCount"
                    name="useCount"
                    className="ml-2"
                    max={1000}
                    min={0}
                    onChange={(e) => {
                      setCount(parseInt(e.target.value, 10));
                    }}
                    value={count}
                  />
                </label>
              )}
            </div>

            <div className="flex justify-end">
              <Input type="submit" value="Upload" />
            </div>
          </form>
        )}
      </main>
    </main>
  );
}

export default Upload;
