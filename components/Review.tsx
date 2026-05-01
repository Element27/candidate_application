import React from 'react'
import { type CandidateApplication } from '@/lib/schemas'
import { type UseFormRegister, type FieldValues, type FieldErrors } from 'react-hook-form'

interface ReviewProps {
  allValues: CandidateApplication
  register: UseFormRegister<CandidateApplication>
  errors: FieldErrors<CandidateApplication>
}

export default function Review({ allValues, register, errors }: ReviewProps) {
  return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Compliance</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-4 border-b border-black w-full">
                <h3 className="text-lg font-semibold mb-3  ">
                  Please review your application
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex w-full justify-between">
                  <h4 className="font-semibold w-1/3 ">Personal Information</h4>
                  <div className="w-2/3 ">
                    <p className="text-sm">Name: {allValues.fullName || "—"}</p>
                    <p className="text-sm">Email: {allValues.email || "—"}</p>
                    <p className="text-sm">
                      Phone: {allValues.phoneNumber || "—"}
                    </p>
                    <p className="text-sm">
                      Location: {allValues.location?.city || "—"},{" "}
                      {allValues.location?.country || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  {" "}
                  <h4 className="font-semibold w-1/3 ">Professional Profile</h4>
                  <div className="w-2/3 ">
                    <p className="text-sm">
                      Resume: {allValues.resumeUrl || "—"}
                    </p>
                    <p className="text-sm">
                      Portfolio: {allValues.portfolioUrl || "—"}
                    </p>
                    <p className="text-sm">
                      LinkedIn: {allValues.linkedInUrl || "—"}
                    </p>
                    <p className="text-sm">
                      Summary: {allValues.professionalSummary || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <h4 className="font-semibold w-1/3 ">Skills</h4>
                  <div className="w-2/3 ">
                    <p>{allValues.skills?.filter(Boolean).join(", ") || "—"}</p>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <h4 className="font-semibold w-1/3 ">Work History</h4>
                  <div className="w-2/3 ">
                  {allValues.workHistory?.length ? (
                    <div className="space-y-3">
                      {allValues.workHistory.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-200 bg-white p-3"
                        >
                          <p className="font-medium">
                           <span className="font-semibold mr-4"> {item.jobTitle || "Untitled role"} </span> |{" "}
                            <span className="ml-4">{item.company || "Unknown company"}</span>
                          </p>
                          <p className="font-bold text-sm text-blue-500">
                            {item.startDate || "Start date missing"} —{" "}
                            {item.isCurrent
                              ? "Present"
                              : item.endDate || "End date missing"}
                          </p>
                          <p className="text-sm">{item.description || "No description provided"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </div>
                </div>
                <div className="flex w-full justify-between">
                  <h4 className="font-semibold w-1/3 ">Education</h4>
                     <div className="w-2/3 ">
                  {allValues.education?.length ? (
                    <div className="space-y-3">
                      {allValues.education.map((item, index) => (
                        <div
                          key={index}
                          className="rounded border border-gray-200 bg-white p-3 flex justify-between"
                        >
                          <p className="font-semibold">
                            {item.degree || "No degree entered"}
                          </p>
                          <p className="text-sm">{item.institution || "No institution entered"}</p>
                          <p className="text-sm">Grad. Year: {item.graduationYear || "—"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </div>
                </div>
              </div>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  {...register("agreedToPrivacyPolicy")}
                  type="checkbox"
                  className="mr-2"
                />
                I agree to the privacy policy
              </label>
              {errors.agreedToPrivacyPolicy && (
                <p className="text-red-500 text-sm">
                  {errors.agreedToPrivacyPolicy.message}
                </p>
              )}
            </div>
          </div>
        );
}
