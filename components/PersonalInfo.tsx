import React from 'react'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import { type CandidateApplication } from '@/lib/schemas'

interface PersonalInfoProps {
  register: UseFormRegister<CandidateApplication>
  errors: FieldErrors<CandidateApplication>
}

export default function PersonalInfo({ register, errors }: PersonalInfoProps) {
   return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register("fullName")}
                placeholder="e.g., John Doe"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="text"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                placeholder="e.g., john.doe@example.com"
                {...register("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                placeholder="e.g., 08012345678"
                {...register("phoneNumber")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                type="tel"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs font-semibold italic">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  placeholder="e.g., Lagos"
                  {...register("location.city")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                  type="text"
                />
                {errors.location?.city && (
                  <p className="text-red-500 text-xs font-semibold italic">
                    {errors.location.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  placeholder="e.g., Nigeria"
                  {...register("location.country")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-xs"
                  type="text"
                />
                {errors.location?.country && (
                  <p className="text-red-500 text-xs font-semibold italic">
                    {errors.location.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
}
