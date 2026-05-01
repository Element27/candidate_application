import React from 'react'
import { type FieldArrayWithId, type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type CandidateApplication } from '@/lib/schemas'

interface EducationProps {
  educationFields: FieldArrayWithId<CandidateApplication, "education", "id">[]
  register: UseFormRegister<CandidateApplication>
  errors: FieldErrors<CandidateApplication>
  removeEducation: (index: number) => void
  appendEducation: (value: CandidateApplication['education'][0]) => void
}

export default function Education({ educationFields, register, errors, removeEducation, appendEducation }: EducationProps) {
  return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {educationFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-md p-4 mb-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Institution
                    </label>
                    <input
                      {...register(`education.${index}.institution`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                      type="text"
                    />
                    {errors.education?.[index]?.institution && (
                      <p className="text-red-500 text-xs font-semibold italic">
                        {errors.education[index]?.institution?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Degree/Field of Study
                    </label>
                    <input
                      {...register(`education.${index}.degree`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                      type="text"
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-red-500 text-xs font-semibold italic">
                        {errors.education[index]?.degree?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Graduation Year
                  </label>
                  <input
                    {...register(`education.${index}.graduationYear`, {
                      valueAsNumber: true,
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                    type="number"
                    min={1900}
                    max={new Date().getFullYear() + 10}
                  />
                  {errors.education?.[index]?.graduationYear && (
                    <p className="text-red-500 text-xs font-semibold italic">
                      {errors.education[index]?.graduationYear?.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="mt-2 text-red-500 text-xs font-semibold italic"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendEducation({
                  institution: "",
                  degree: "",
                  graduationYear: new Date().getFullYear(),
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Education
            </button>
          </div>
        );
}
