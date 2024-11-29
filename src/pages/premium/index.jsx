import Header from "@/components/app/header";
import SuccesModal from "@/components/app/successModal";
import AnimatedButton from "@/components/ui/animatedButton";
import AnimateElement from "@/components/ui/AnimateElement";
import AnimateWords from "@/components/ui/AnimateWords";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { budgetList } from "@/constants/constant";
import {
  clearFieldError,
  convertCamelCaseToReadable,
  setFieldError,
} from "@/lib/functions";
import { validateField } from "@/lib/validateField";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Premium = () => {
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [budget, setBudget] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
    budget: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputValue = value;
    if (name === "phone") {
      inputValue = inputValue.replace(/(?!^\+)[^0-9]/g, "");
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

  const handleBudgets = (name) => {
    setBudget((prev) => {
      const updatedBudget = prev === name ? "" : name; // Toggle selection

      setFormData((prevFormData) => ({
        ...prevFormData,
        budget: updatedBudget,
      }));

      if (!updatedBudget) {
        setFieldError(
          setErrors,
          "budget",
          "Please select at least one budget."
        );
      } else {
        clearFieldError(setErrors, "budget");
      }

      return updatedBudget;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    Object.keys(formData).forEach((item) => {
      if (item === "budget") {
        if (formData.budget.length === 0) {
          newErrors.budget = "Please select at least one budget.";
        }
      } else if (
        item != "company" &&
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
      <Helmet>
        <title>Premium | SHI Studio</title>
        <meta name="description" content="SHI Studio - Premium page" />
      </Helmet>

      <div className="divider">
        <Header />
        <div className="wrapper shi-container">
          <div>
            <h2 className="text-[72px] text-text-color">
              <AnimateWords text="Premium" />
            </h2>
            <div className="max-w-[660px]">
              <div className="mt-4 font-helvetica_light lg:text-[24px] text-xl leading-[150%]">
                <AnimateWords text="Our plans can be fully customized to your workload need whether you’re an enterprise, fast-growing business, or agency. Contact us to help you build the best plan for you" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <form
              className="lg:w-1/2 w-full"
              onSubmit={handleSubmit}
              noValidate
            >
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

              <Textarea
                name="aboutProject"
                labelName="About Project"
                value={formData.aboutProject}
                error={errors.aboutProject}
                handleChange={handleChange}
              />

              <AnimateElement className="translate-y-16">
                <div className="py-8">
                  <h6 className="text-[18px] font-helvetica_medium">Budget:</h6>

                  <div className="pt-3 flex items-center flex-wrap gap-2">
                    {budgetList.map((item) => (
                      <Button
                        key={item.id}
                        size="small"
                        variant="outlined"
                        className={`border border-pale-gray rounded-[20px] text-[14px] transition-all ease-custom duration-300 md:hover:bg-gray_light  ${
                          budget == item.name
                            ? "bg-primary text-white"
                            : "text-gray-60"
                        }`}
                        handleClick={() => handleBudgets(item.name)}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                  {errors.budget && <ErrorMessage value={errors.budget} />}
                </div>
              </AnimateElement>

              <AnimatedButton
                type="submit"
                mode="dark"
                text="Book a discovery call"
                className="border-primary"
              />
            </form>
          </div>
        </div>
        {showSuccesModal && <SuccesModal setShow={setShowSuccesModal} />}
      </div>
    </>
  );
};

export default Premium;
