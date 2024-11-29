import Button from "@/components/ui/Button";
import styles from "./joinTeam.module.scss";
import { vacanciesList } from "@/constants/constant";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { validateField } from "@/lib/validateField";
import {
  clearFieldError,
  convertCamelCaseToReadable,
  setFieldError,
} from "@/lib/functions";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccesModal from "@/components/app/successModal";
import AnimatedButton from "@/components/ui/animatedButton";
import AnimateElement from "@/components/ui/AnimateElement";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet";

const JoinTeam = () => {
  const uploadIntervalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [profession, setProfession] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    phone: "",
    email: "",
    message: "",
    profession: [],
    file: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    linkedin: "",
    phone: "",
    email: "",
    message: "",
    profession: "",
    file: "",
  });
  const [fileSize, setFileSize] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  useEffect(() => {
    console.log(formData.file?.fileName);
  }, [formData]);

  const formatFileSize = (sizeInBytes) => {
    let sizeKB = sizeInBytes / 1024;

    if (sizeKB >= 1024) {
      const sizeMB = sizeKB / 1024;
      return `${Math.round(sizeMB * 100) / 100} MB`;
    } else {
      return `${Math.round(sizeKB * 100) / 100} KB`;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let inputValue = value;
    if (name === "phone") {
      inputValue = inputValue.replace(/(?!^\+)[^0-9]/g, "");
    }
    if (name === "file") {
      const file = files[0];

      const calculatedFileSize = file ? formatFileSize(file.size) : null;
      setFileSize(calculatedFileSize);
      handleUpload();

      if (!file) {
        setFieldError(
          setErrors,
          name,
          `The ${convertCamelCaseToReadable(name)} is required`
        );
      } else if (!file.name.match(/\.(pdf|doc|docx|png|jpg|jpeg)$/i)) {
        setFieldError(
          setErrors,
          name,
          `Please upload a PDF, Word document, PNG, JPG, or JPEG file for ${convertCamelCaseToReadable(
            name
          )}`
        );

        if (uploadIntervalRef.current) {
          clearInterval(uploadIntervalRef.current);
          uploadIntervalRef.current = null;
        }
        setFormData((prev) => ({ ...prev, file: null }));
        setFileSize("");
        setProgress(0);
        setUploadStatus("select"); 
      } else if (file.size > 5 * 1024 * 1024) {
        setFieldError(
          setErrors,
          name,
          `The ${convertCamelCaseToReadable(name)} must be less than 5MB`
        );
      } else {
        clearFieldError(setErrors, name);
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({
            ...prev,
            [name]: { file: reader.result, fileName: file.name },
          }));
        };
        reader.readAsDataURL(file);
        fileInputRef.current.value = null;
      }
    } else {
      let errorMessage = validateField(name, inputValue);
      if (errorMessage) {
        setFieldError(setErrors, name, errorMessage);
      } else {
        clearFieldError(setErrors, name);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleProfession = (name) => {
    setProfession((prev) => {
      const updatedProfession = prev.includes(name) ? [] : [name];

      setFormData((prevFormData) => ({
        ...prevFormData,
        profession: updatedProfession,
      }));

      if (updatedProfession.length === 0) {
        setFieldError(
          setErrors,
          "profession",
          "Please select at least one profession."
        );
      } else {
        clearFieldError(setErrors, "profession");
      }

      return updatedProfession;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    Object.keys(formData).forEach((item) => {
      if (item === "file") {
        const file = formData.file?.file;

        if (!file) {
          newErrors.file = `The ${convertCamelCaseToReadable(
            item
          )} is required.`;
        }
      } else if (item === "profession") {
        if (formData.profession.length === 0) {
          newErrors.profession = "Please select at least one profession.";
        }
      } else if (
        item != "linkedin" &&
        typeof formData[item] === "string" &&
        formData[item].trim().length === 0
      ) {
        newErrors[item] = `The ${convertCamelCaseToReadable(
          item
        )} is required.`;
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== "" && error !== false
    );

    if (!hasErrors) {
      console.log("Form Data: ", formData);
      setShowSuccesModal(true);
    }
  };

  const clearFile = () => {
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    setFormData((prev) => ({ ...prev, file: null }));
    setFileSize("");
    setProgress(0);
    setUploadStatus("select");
    clearFieldError(setErrors, "file");
  };

  useEffect(() => {
    if (uploadStatus === "uploading") {
      simulatedUpload(setProgress);
      setTimeout(() => setUploadStatus("done"), 50);
    }
  }, [uploadStatus]);

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFile();
      return;
    }
    setUploadStatus("uploading");

    // try {
    //   setUploadStatus("uploading");

    //   const form_data = new FormData();
    //   form_data.append("file", formData.file);

    //   await axios.post("http://localhost:5173/api/upload", form_data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       const percentCompleted = Math.round(
    //         (progressEvent.loaded * 100) / progressEvent.total
    //       );
    //       setProgress(percentCompleted);
    //     },
    //   });
    //   setUploadStatus("done");
    // } catch (error) {
    //   setUploadStatus("select");
    //   console.error(error);
    // }
  };

  const simulatedUpload = (progressCallback) => {
    let progress = 0;
    uploadIntervalRef.current = setInterval(() => {
      progress += 2;
      if (progress >= 100) {
        clearInterval(uploadIntervalRef.current);
        setUploadStatus("done");
      }
      progressCallback(progress);
    }, 50);
  };

  return (
    <>
      <Helmet>
        <title>Join our Team | SHI Studio</title>
        <meta name="description" content="SHI Studio - Contact page" />
      </Helmet>
      <form className="w-full" onSubmit={handleSubmit} noValidate>
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Input
            name="name"
            labelName="Name"
            value={formData.name}
            handleChange={handleChange}
            error={errors.name}
          />

          <Input
            name="linkedin"
            labelName="Linkedin"
            value={formData.linkedin}
            error={errors.linkedin}
            handleChange={handleChange}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            type="tel"
            name="phone"
            labelName="Phone number"
            value={formData.phone}
            error={errors.phone}
            handleChange={handleChange}
          />

          <Input
            name="email"
            labelName="Email Address"
            type="email"
            value={formData.email}
            error={errors.email}
            handleChange={handleChange}
          />
        </div>

        <AnimateElement className="translate-y-16">
          <div className="pt-6">
            <h6 className="text-[18px] font-helvetica_medium">I apply for:</h6>
            <div className="pt-3 flex items-center flex-wrap gap-2">
              {vacanciesList.map((item) => (
                <Button
                  key={item.id}
                  size="small"
                  variant="outlined"
                  className={`border border-pale-gray rounded-[20px] text-[14px] text-gray-60 transition-all ease-custom duration-300 ${
                    profession.includes(item.name)
                      ? "bg-primary text-white"
                      : "md:hover:bg-gray_light"
                  }`}
                  handleClick={() => handleProfession(item.name)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            {errors.profession && <ErrorMessage value={errors.profession} />}
          </div>
        </AnimateElement>

        <Textarea
          name="message"
          labelName="Your message"
          value={formData.message}
          error={errors.message}
          handleChange={handleChange}
        />

        <AnimateElement className="translate-y-16">
          <div className="mt-6 mb-8">
            <div className="bg-milk border border-divider_light p-3 rounded">
              <label htmlFor="file" className={styles.label_file}>
                <div>
                  <span>Please include your CV:</span>
                </div>
                <LazyLoadImage src="/images/paperclip.svg" alt="Image" />
              </label>

              {formData.file?.fileName &&
                ["pdf", "doc", "docx", "png", "jpg", "jpeg"].includes(
                  formData.file.fileName.split(".").pop().toLowerCase()
                ) && (
                  <div className={styles.file_loader}>
                    <div className="flex gap-4 items-start">
                      <div className={styles.file_icon}>
                        <LazyLoadImage src="/images/file.svg" alt="Image" />
                      </div>
                      <div className={styles.file_info}>
                        <div className={styles.file_name}>
                          {formData.file?.fileName &&
                            (() => {
                              const fileName = formData.file.fileName;
                              const [name, extension] = [
                                fileName.slice(0, fileName.lastIndexOf(".")),
                                fileName.slice(fileName.lastIndexOf(".") + 1),
                              ];
                              const truncatedName =
                                name.length > 20 ? name.slice(0, 20) : name;
                              return `${truncatedName}.${extension}`;
                            })()}
                        </div>
                        <span className={styles.file_size}>{fileSize}</span>

                        <div className={styles.progress_bg}>
                          <div className={styles.progress_inner}>
                            <div className={styles.progress}>
                              <div
                                className={`${styles.progress_active} ${
                                  progress === 100 &&
                                  styles.progress_active_success
                                }`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <div className={styles.progress_percent}>
                              <div>{progress}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.file_close}
                      onClick={() => clearFile()}
                    >
                      <LazyLoadImage src="/images/close.svg" alt="Image" />
                    </button>
                  </div>
                )}
            </div>
            <input
              type="file"
              id="file"
              name="file"
              className={styles.file_input}
              onChange={handleChange}
              ref={fileInputRef}
            />
            {errors.file && <ErrorMessage value={errors.file} />}
          </div>
        </AnimateElement>

        <AnimatedButton
          type="submit"
          mode="dark"
          text="Send request"
          className="border-primary"
        />
      </form>
      {showSuccesModal && <SuccesModal setShow={setShowSuccesModal} />}
    </>
  );
};

export default JoinTeam;
