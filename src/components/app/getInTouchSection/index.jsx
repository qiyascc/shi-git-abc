import MainTitle from "@/components/ui/MainTitle";
import styles from "./getInTouchSection.module.scss";
import { professionList } from "@/constants/constant";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { validateField } from "@/lib/validateField";
import {
  clearFieldError,
  convertCamelCaseToReadable,
  setFieldError,
} from "@/lib/functions";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccesModal from "../successModal";
import AnimatedButton from "@/components/ui/animatedButton";
import AnimateElement from "@/components/ui/AnimateElement";

const GetInTouchSection = () => {
  const [profession, setProfession] = useState([]);
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
    profession: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
    profession: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputValue = value;
    if (name === "phone") {
      inputValue = inputValue.replace(/\D/g, "");
    }
    let errorMessage = validateField(name, inputValue);
    if (errorMessage) {
      setFieldError(setErrors, name, errorMessage);
    } else {
      clearFieldError(setErrors, name);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleProfession = (name) => {
    setProfession((prev) => {
      const updatedProfessions = prev.includes(name)
        ? prev.filter((professionName) => professionName !== name)
        : [...prev, name];

      setFormData((prevFormData) => ({
        ...prevFormData,
        profession: updatedProfessions,
      }));

      if (updatedProfessions.length === 0) {
        setFieldError(
          setErrors,
          "profession",
          "Please select at least one profession."
        );
      } else {
        clearFieldError(setErrors, "profession");
      }

      return updatedProfessions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    Object.keys(formData).forEach((item) => {
      if (item === "profession") {
        if (formData.profession.length === 0) {
          newErrors.profession = "Please select at least one profession.";
        }
      } else if (
        item !== "company" &&
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

  return (
    <>
      <div className={`${styles.getInTouchSection} wrapper shi-container `}>
        <div className="w-full">
          <MainTitle subtitle="Ready to transform" title="your business?" />
        </div>
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
              name="company"
              labelName="Company"
              value={formData.company}
              error={errors.company}
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
            <div className="pt-8 pb-6">
              <h6 className="text-[18px] font-helvetica_medium">
                I am interested in:
              </h6>

              <div className="pt-3 flex items-center flex-wrap gap-2">
                {professionList.map((item) => (
                  <Button
                    key={item.id}
                    size="small"
                    variant="outlined"
                    className={`border border-pale-gray rounded-[20px] text-[14px] text-gray-60 transition-all ease-custom duration-300 ${
                      profession.includes(item.name)
                        ? "bg-primary text-white"
                        : "hover:bg-gray_light"
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

          <div>
            <Textarea
              name="aboutProject"
              labelName="About Project"
              value={formData.aboutProject}
              error={errors.aboutProject}
              handleChange={handleChange}
            />
          </div>

          <AnimatedButton
            type="submit"
            mode="dark"
            text="Send request"
            className="border-primary"
          />
        </form>
      </div>
      {showSuccesModal && <SuccesModal setShow={setShowSuccesModal} />}
    </>
  );
};

export default GetInTouchSection;
