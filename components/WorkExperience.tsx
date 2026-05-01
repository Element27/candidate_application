import React from 'react'
import { useFieldArray, type Control, type UseFormRegister, type FieldErrors, type UseFormWatch, type UseFormSetValue } from 'react-hook-form'
import { type CandidateApplication } from '@/lib/schemas'

interface WorkExperienceProps {
  control: Control<CandidateApplication>
  register: UseFormRegister<CandidateApplication>
  errors: FieldErrors<CandidateApplication>
  watch: UseFormWatch<CandidateApplication>
  setValue: UseFormSetValue<CandidateApplication>
}

export default function WorkExperience({ control, register, errors, watch, setValue }: WorkExperienceProps) {
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workHistory",
  });
  
  const skills = watch("skills");
  const workHistoryWatch = watch("workHistory");

  const appendSkill = () => {
    setValue("skills", [...skills, ""], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeSkill = (index: number) => {
    const nextSkills = skills.filter((_, i) => i !== index);
    setValue("skills", nextSkills, { shouldValidate: true, shouldDirty: true });
  };

  return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Technical & Experience</h2>
            <div>
              <label className="block text-sm font-medium">Skills</label>
              {skills?.map((skill, index) => (
                <div key={`skill-${index}`} className="flex items-center mb-2">
                  <input
                    {...register(`skills.${index}`)}
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    type="text"
                    placeholder="e.g., JavaScript"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={appendSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Skill
              </button>
              {errors.skills && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.skills.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Work History</label>
              {workFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-md p-4 mb-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Job Title
                      </label>
                      <input
                        {...register(`workHistory.${index}.jobTitle`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                        type="text"
                      />
                      {errors.workHistory?.[index]?.jobTitle && (
                        <p className="text-red-500 text-xs font-semibold italic">
                          {errors.workHistory[index]?.jobTitle?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Company
                      </label>
                      <input
                        {...register(`workHistory.${index}.company`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                        type="text"
                      />
                      {errors.workHistory?.[index]?.company && (
                        <p className="text-red-500 text-xs font-semibold italic">
                          {errors.workHistory[index]?.company?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Start Date
                      </label>
                      <input
                        {...register(`workHistory.${index}.startDate`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                        type="date"
                      />
                      {errors.workHistory?.[index]?.startDate && (
                        <p className="text-red-500 text-xs font-semibold italic">
                          {errors.workHistory[index]?.startDate?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        End Date
                      </label>
                      <input
                        {...register(`workHistory.${index}.endDate`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                        type="date"
                        disabled={workHistoryWatch?.[index]?.isCurrent}
                      />
                      {errors.workHistory?.[index]?.endDate && (
                        <p className="text-red-500 text-xs font-semibold italic">
                          {errors.workHistory[index]?.endDate?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input
                        {...register(`workHistory.${index}.isCurrent`)}
                        type="checkbox"
                        className="mr-2"
                      />
                      Currently working here
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Description (optional)
                    </label>
                    <textarea
                      {...register(`workHistory.${index}.description`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                      rows={3}
                      maxLength={2000}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWork(index)}
                    className="mt-2 text-red-500 text-xs font-semibold italic"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendWork({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    description: "",
                  })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Work Experience
              </button>
            </div>
          </div>
        );
}
