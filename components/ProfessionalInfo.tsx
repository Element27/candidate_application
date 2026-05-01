import React from 'react'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type CandidateApplication } from '@/lib/schemas'

interface ProfessionalInfoProps {
  register: UseFormRegister<CandidateApplication>
  errors: FieldErrors<CandidateApplication>
}

export default function ProfessionalInfo({ register, errors }: ProfessionalInfoProps) {
  return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Professional Profile</h2>
            <div>
              <label className="block text-sm font-medium">Resume URL</label>
              <input
                {...register("resumeUrl")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="url"
                placeholder="https://example.com/resume.pdf"
              />
              {errors.resumeUrl && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.resumeUrl.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Portfolio URL (optional)
              </label>
              <input
                {...register("portfolioUrl")}
                placeholder="https://example.com/portfolio"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="url"
              />
              {errors.portfolioUrl && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.portfolioUrl.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                LinkedIn URL (optional)
              </label>
              <input
                {...register("linkedInUrl")}
                placeholder="https://example.com/linkedIn"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="url"
              />
              {errors.linkedInUrl && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.linkedInUrl.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Professional Summary (optional)
              </label>
              <textarea
                {...register("professionalSummary")}
                placeholder="Briefly describe your professional background and key achievements..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                rows={4}
                maxLength={1000}
              />
              {errors.professionalSummary && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.professionalSummary.message}
                </p>
              )}
            </div>
          </div>
        );
}
