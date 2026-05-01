'use client';

import { useState } from 'react';
import { useForm, useFieldArray, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { candidateApplicationSchema, type CandidateApplication } from '@/lib/schemas';
import { toast } from 'react-toastify';

const steps = [
  'Personal Information',
  'Professional Profile',
  'Technical & Experience',
  'Education',
  'Compliance',
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
    trigger,
  } = useForm<CandidateApplication>({
    resolver: zodResolver(candidateApplicationSchema) as Resolver<CandidateApplication>,
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      location: {
        city: '',
        country: '',
      },
      resumeUrl: '',
      portfolioUrl: '',
      linkedInUrl: '',
      professionalSummary: '',
      skills: [''],
      workHistory: [
        {
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          description: '',
        },
      ],
      education: [
        {
          institution: '',
          degree: '',
          graduationYear: new Date().getFullYear(),
        },
      ],
      agreedToPrivacyPolicy: false,
    },
  });

  const workHistoryWatch = watch('workHistory');

  const skills = watch('skills');
  const allValues = watch();

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: 'workHistory',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const appendSkill = () => {
    setValue('skills', [...skills, ''], { shouldValidate: true, shouldDirty: true });
  };

  const removeSkill = (index: number) => {
    const nextSkills = skills.filter((_, i) => i !== index);
    setValue('skills', nextSkills, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (data: CandidateApplication) => {
    console.log('Form submitted:', data);
    toast.success('Application submitted successfully!');
  };

  const nextStep = async () => {
    const stepFieldGroups = [
      ['fullName', 'email', 'phoneNumber', 'location.city', 'location.country'],
      ['resumeUrl', 'portfolioUrl', 'linkedInUrl', 'professionalSummary'],
      ['skills', 'workHistory'],
      ['education'],
      ['agreedToPrivacyPolicy'],
    ] as const;

    const isStepValid = await trigger(stepFieldGroups[currentStep]);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register('fullName')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="text"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                {...register('email')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                {...register('phoneNumber')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="tel"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  {...register('location.city')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="text"
                />
                {errors.location?.city && <p className="text-red-500 text-sm">{errors.location.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  {...register('location.country')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  type="text"
                />
                {errors.location?.country && <p className="text-red-500 text-sm">{errors.location.country.message}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Professional Profile</h2>
            <div>
              <label className="block text-sm font-medium">Resume URL</label>
              <input
                {...register('resumeUrl')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="url"
                placeholder="https://example.com/resume.pdf"
              />
              {errors.resumeUrl && <p className="text-red-500 text-sm">{errors.resumeUrl.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Portfolio URL (optional)</label>
              <input
                {...register('portfolioUrl')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="url"
              />
              {errors.portfolioUrl && <p className="text-red-500 text-sm">{errors.portfolioUrl.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">LinkedIn URL (optional)</label>
              <input
                {...register('linkedInUrl')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                type="url"
              />
              {errors.linkedInUrl && <p className="text-red-500 text-sm">{errors.linkedInUrl.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Professional Summary (optional)</label>
              <textarea
                {...register('professionalSummary')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows={4}
                maxLength={1000}
              />
              {errors.professionalSummary && <p className="text-red-500 text-sm">{errors.professionalSummary.message}</p>}
            </div>
          </div>
        );
      case 2:
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
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Work History</label>
              {workFields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Job Title</label>
                      <input
                        {...register(`workHistory.${index}.jobTitle`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Company</label>
                      <input
                        {...register(`workHistory.${index}.company`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium">Start Date</label>
                      <input
                        {...register(`workHistory.${index}.startDate`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        type="date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">End Date</label>
                      <input
                        {...register(`workHistory.${index}.endDate`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        type="date"
                        disabled={workHistoryWatch?.[index]?.isCurrent}
                      />
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
                    <label className="block text-sm font-medium">Description (optional)</label>
                    <textarea
                      {...register(`workHistory.${index}.description`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      rows={3}
                      maxLength={2000}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWork(index)}
                    className="mt-2 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendWork({
                  jobTitle: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  isCurrent: false,
                  description: '',
                })}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Work Experience
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {educationFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Institution</label>
                    <input
                      {...register(`education.${index}.institution`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Degree/Field of Study</label>
                    <input
                      {...register(`education.${index}.degree`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">Graduation Year</label>
                  <input
                    {...register(`education.${index}.graduationYear`, { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    type="number"
                    min={1900}
                    max={new Date().getFullYear() + 10}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendEducation({
                institution: '',
                degree: '',
                graduationYear: new Date().getFullYear(),
              })}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Education
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Compliance</h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-lg font-semibold mb-3">Please review your application</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Personal Information</h4>
                  <p>Name: {allValues.fullName || '—'}</p>
                  <p>Email: {allValues.email || '—'}</p>
                  <p>Phone: {allValues.phoneNumber || '—'}</p>
                  <p>Location: {allValues.location?.city || '—'}, {allValues.location?.country || '—'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Professional Profile</h4>
                  <p>Resume: {allValues.resumeUrl || '—'}</p>
                  <p>Portfolio: {allValues.portfolioUrl || '—'}</p>
                  <p>LinkedIn: {allValues.linkedInUrl || '—'}</p>
                  <p>Summary: {allValues.professionalSummary || '—'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Skills</h4>
                  <p>{allValues.skills?.filter(Boolean).join(', ') || '—'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Work History</h4>
                  {allValues.workHistory?.length ? (
                    <div className="space-y-3">
                      {allValues.workHistory.map((item, index) => (
                        <div key={index} className="rounded border border-gray-200 bg-white p-3">
                          <p className="font-medium">{item.jobTitle || 'Untitled role'} at {item.company || 'Unknown company'}</p>
                          <p>
                            {item.startDate || 'Start date missing'} — {item.isCurrent ? 'Present' : item.endDate || 'End date missing'}
                          </p>
                          <p>{item.description || 'No description provided'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">Education</h4>
                  {allValues.education?.length ? (
                    <div className="space-y-3">
                      {allValues.education.map((item, index) => (
                        <div key={index} className="rounded border border-gray-200 bg-white p-3">
                          <p className="font-medium">{item.degree || 'No degree entered'}</p>
                          <p>{item.institution || 'No institution entered'}</p>
                          <p>Graduation Year: {item.graduationYear || '—'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  {...register('agreedToPrivacyPolicy')}
                  type="checkbox"
                  className="mr-2"
                />
                I agree to the privacy policy
              </label>
              {errors.agreedToPrivacyPolicy && <p className="text-red-500 text-sm">{errors.agreedToPrivacyPolicy.message}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 text-center py-2 ${
                index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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