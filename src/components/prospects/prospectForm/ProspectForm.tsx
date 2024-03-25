import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SavedProspect } from "../../../services/queries/prospectsQueries";
import { Button } from "../../tools/buttons/Button";
import Spinner from "../../tools/spinner/Spinner";
import Pill from "../../tools/pill/Pill";
import { Cross2Icon } from "@radix-ui/react-icons";

const prospectFormSchema = z.object({
  businessName: z.string(),
  notes: z.string().optional(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export type ProspectFormSchema = z.infer<typeof prospectFormSchema>;

type FormProps = {
  prospect: SavedProspect;
};

const ProspectForm: React.FC<FormProps> = ({ prospect }) => {
  const isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProspectFormSchema>({
    resolver: zodResolver(prospectFormSchema),
    values: prospect,
  });

  const [emailDraft, setEmailDraft] = useState("");
  const [emails, setEmails] = useState(prospect.emails);

  const onSubmit = () => {
    return;
  };

  return (
    <form
      className="bg-white w-full shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-8 flex flex-col border-b border-b-gray-300">
        <span className="font-semibold">Lead Information</span>
        <span className="text-xs text-gray-400">
          You can update the prospect information and add notes using this form
          below
        </span>
      </div>

      <div className="p-8 pb-4">
        <div className="mb-8 grid grid-cols-2 gap-y-4 gap-x-8">
          <div className="col-span-2">
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Business Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="userName"
                {...register("businessName")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.businessName && "border-red-500"
                }`}
              />
            </div>
            {errors.businessName && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.businessName?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="phone"
                {...register("phone")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.phone && "border-red-500"
                }`}
              />
              {errors.phone && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.phone?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Website
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="website"
                {...register("website")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.website && "border-red-500"
                }`}
              />
              {errors.website && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.website?.message}
                </p>
              )}
            </div>
          </div>

          {/* <div className="col-span-2">
              <label
                htmlFor="industry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Industry
              </label>
              <div className="w-full mt-2">
                <input
                  type="text"
                  id="industry"
                  {...register("industry")}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    errors.industry && "border-red-500"
                  }`}
                />
                {errors.industry && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.industry?.message}
                  </p>
                )}
              </div>
            </div> */}

          <div className="col-span-2">
            <label
              htmlFor="prospectEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {"Email Addresses"}
            </label>
            <div className="w-full mt-2">
              <div className="flex flex-wrap py-1.5 pl-4 gap-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-inset">
                {emails.map((email, index) => (
                  <Pill
                    key={index}
                    className="self-center"
                    bgColor={"lightBlue"}
                  >
                    {email}
                    <Cross2Icon
                      className="size-4 cursor-pointer"
                      onClick={() => {
                        const newEmails = emails.filter((_, i) => i !== index);
                        setEmails(newEmails);
                      }}
                    />
                  </Pill>
                ))}
                <input
                  type="email"
                  id="prospectEmail"
                  value={emailDraft}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setEmails([...emails, emailDraft]);
                      setEmailDraft("");
                    }
                  }}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  className="flex-1 p-0 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <span className="mt-2 block text-xs text-gray-400">
                Press enter or spacebar after typing email to add
              </span>
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notes
            </label>
            <div className="w-full mt-2">
              <textarea
                id="notes"
                rows={3}
                {...register("notes")}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  errors.notes && "border-red-500"
                }`}
              />
              {errors.notes && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.notes?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-end gap-4">
        <Button type="button" variant="noBorder">
          Cancel
        </Button>
        <Button
          type="submit"
          // disabled={isCreating || isUpdating || isUpdatingProfile}
        >
          {isUpdating ? (
            <>
              <Spinner /> Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProspectForm;