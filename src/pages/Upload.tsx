/* eslint-disable no-unused-vars */
import { Component, createRef, ReactNode, useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Category, getCategories } from "@/api/category";
import Input, { FileInput, TextArea } from "@/components/Input";
import { uploadPhoto } from "@/api/photo";
import Loading from "@/components/Loading";

interface UploadProps {
  navigate: NavigateFunction;
}
interface UploadState {
  title: string;
  description: string;
  fileUrl: string;
  selectedCategories: Category[];
  categories: Category[];
  error: Error | null;
  isLoaded: boolean;
}

class Upload extends Component<UploadProps, UploadState> {
  private fileInputEl = createRef<FileInput>();

  constructor(props: UploadProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      fileUrl: "",
      selectedCategories: [],
      categories: [],
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    getCategories().then((categories) => {
      this.setState({
        categories,
        isLoaded: true
      });
      // ! Test
      this.setState({
        isLoaded: false
      });
    });
  }

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    // @ts-ignore
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name, id } = target;

    // @ts-ignore
    this.setState({
      [name ?? id]: value
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { navigate } = this.props;

    if (!this.fileInputEl.current) {
      return;
    }
    const file = this.fileInputEl.current.state.files?.[0];

    if (!file) {
      this.setState({ error: new Error("No file selected.") });
      return;
    }

    // If file isn't an image, throw error
    if (!file.type.startsWith("image/")) {
      this.setState({ error: new Error("File must be an image.") });
      return;
    }

    if (title && description) {
      const data = {
        title,
        description,
        file
      };

      uploadPhoto(data).then((response) => {
        if (response) {
          navigate(`/photo/${response.id}`);
        } else {
          navigate("/");
        }
      });
    } else {
      this.setState({ error: new Error("Title and description required.") });
    }
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // If file isn't an image, throw error
      if (!file.type.startsWith("image/")) {
        this.setState({ error: new Error("File must be an image.") });
        return;
      }
      this.setState({
        fileUrl: URL.createObjectURL(file)
      });
    }
  };

  render(): ReactNode {
    const {
      title,
      description,
      fileUrl,
      selectedCategories,
      categories,
      error,
      isLoaded
    } = this.state;

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
            <form className="flex flex-col" onSubmit={this.handleSubmit}>
              <FileInput
                type="file"
                id="file"
                ref={this.fileInputEl}
                accept="image/*"
                onChange={this.handleFileChange}
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
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
              </div>
              <div className="mb-2">
                <label className="text-sm" htmlFor="tags">
                  Tags
                  <Input type="text" id="tags" name="tags" className="w-full" />
                </label>
              </div>
              <div className="mb-2">
                <label className="text-sm" htmlFor="location">
                  Location
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full"
                  />
                </label>
              </div>
              <Input type="submit" value="Upload" />
            </form>
          )}
        </main>
      </main>
    );
  }
}

export default Upload;
