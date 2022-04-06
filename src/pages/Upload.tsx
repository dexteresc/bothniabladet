import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, getCategories } from "@/api/category";
import Input, { FileInput, TextArea } from "@/components/Input";
import ThemeButton from "@/components/ThemeButton";

function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState<Category[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((result) => {
        setIsLoaded(true);
        setCategories(result);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, []);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Check that file is an image
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      if (!newFile.type.startsWith("image/")) {
        setError(new TypeError("File is not an image."));
        return;
      }
      setFile(newFile);
    }

    // Clear error
    setError(null);
  }

  return (
    <main className="flex flex-col min-h-screen py-5 max-w-3xl mx-auto px-4">
      <header className="mb-4">
        <button
          type="button"
          className="material-icons mb-5"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </button>
        <h1 className="font-semibold text-2xl">Upload</h1>
      </header>
      <main>
        {error && <div>Error: {error.message}</div>}
        {!isLoaded && <div>Loading...</div>}
        {isLoaded && (
          <form className="flex flex-col">
            <FileInput type="file" id="file" onChange={handleFileChange}>
              {!file ? (
                "Upload image"
              ) : (
                <img
                  className="h-16 w-16 mb-2"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              )}
            </FileInput>
            <div className="mb-2">
              <label className="text-sm" htmlFor="title">
                Title
              </label>
              <Input type="text" id="title" className="w-full" />
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="description">
                Description
              </label>
              <TextArea id="description" className="w-full h-28" />
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="categories">
                Categories
              </label>
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="tags">
                Tags
              </label>
              <Input type="text" id="tags" className="w-full" />
            </div>
            <div className="mb-2">
              <label className="text-sm" htmlFor="location">
                Location
              </label>
              <Input type="text" id="location" className="w-full" />
            </div>
          </form>
        )}
      </main>
      <ThemeButton />
    </main>
  );
}

export default Upload;
