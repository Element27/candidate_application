"use client";

import { useState } from "react";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  candidateApplicationSchema,
  type CandidateApplication,
} from "@/lib/schemas";
import { toast } from "react-toastify";
import PersonalInfo from "@/components/PersonalInfo";
import ProfessionalInfo from "@/components/ProfessionalInfo";
import WorkExperience from "@/components/WorkExperience";
import Review from "@/components/Review";
import Education from "@/components/Education";

const steps = [
  "Personal Information",
  "Professional Profile",
  "Technical & Experience",
  "Education",
  "Compliance",
];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
    trigger,
  } = useForm<CandidateApplication>({
    resolver: zodResolver(
      candidateApplicationSchema,
    ) as Resolver<CandidateApplication>,
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      location: {
        city: "",
        country: "",
      },
      resumeUrl: "",
      portfolioUrl: "",
      linkedInUrl: "",
      professionalSummary: "",
      skills: [""],
      workHistory: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          graduationYear: new Date().getFullYear(),
        },
      ],
      agreedToPrivacyPolicy: false,
    },
  });

  const allValues = watch();

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data: CandidateApplication) => {
    console.log("Form submitted:", data);
    toast.success("Application submitted successfully!");
    setCurrentStep(0);
    reset();
  };

  const nextStep = async () => {
    const stepFieldGroups = [
      ["fullName", "email", "phoneNumber", "location.city", "location.country"],
      ["resumeUrl", "portfolioUrl", "linkedInUrl", "professionalSummary"],
      ["skills", "workHistory"],
      ["education"],
      ["agreedToPrivacyPolicy"],
    ] as const;

    const isStepValid = await trigger(stepFieldGroups[currentStep]);
    if (!isStepValid) return;

    // Validate work experience has at least 1 filled entry
    if (currentStep === 2) {
      const workHistory = allValues.workHistory || [];
      const hasFilledWorkExperience = workHistory.some(
        (work) => work.jobTitle?.trim() && work.company?.trim()
      );
      if (!hasFilledWorkExperience) {
        toast.error("Please add at least 1 work experience entry");
        return;
      }
    }

    // Validate education has at least 1 filled entry
    if (currentStep === 3) {
      const education = allValues.education || [];
      const hasFilledEducation = education.some(
        (edu) => edu.institution?.trim() && edu.degree?.trim()
      );
      if (!hasFilledEducation) {
        toast.error("Please add at least 1 education entry");
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo register={register} errors={errors} />;
      case 1:
        return <ProfessionalInfo register={register} errors={errors} />;
      case 2:
        return (
          <WorkExperience
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
      case 3:
        return (
          <Education
            educationFields={educationFields}
            register={register}
            errors={errors}
            removeEducation={removeEducation}
            appendEducation={appendEducation}
          />
        );
      case 4:
        return (
          <Review allValues={allValues} register={register} errors={errors} />
        );
      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto p-6 w-full ">
      <div className="mb-6 w-2/3 mx-auto p-1 border border-blue-500 rounded-md">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-center text-sm py-2  ${
                index <= currentStep
                  ? "bg-blue-500 duration-300 rounded-md text-white"
                  : " text-gray-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-2/3 mx-auto bg-white p-6 rounded-md shadow-md"
      >
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
