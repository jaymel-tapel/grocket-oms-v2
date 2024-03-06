import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EmailTemplate,
  useCreateEmailTemplate,
  useUpdateEmailTemplate,
} from "../../services/queries/prospectsQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Button } from "../tools/buttons/Button";
import Spinner from "../tools/spinner/Spinner";
import { useNavigate } from "@tanstack/react-router";

const emailTemplateSchema = z.object({
  name: z.string().min(1, { message: "Template name is required" }),
  subject: z.string().min(1, { message: "Email subject is required" }),
  content: z.string().min(1, { message: "Email content is required" }),
});

type EmailTemplateSchema = z.infer<typeof emailTemplateSchema>;

type Props = {
  template?: EmailTemplate;
};

const EmailTemplateForm: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate();
  const readableContent = useMemo(() => {
    if (!template) return "";

    let content = template.content.replace(/<\/?p>/g, "");
    content = content.replace(/<br\/>/g, "\n");

    return content;
  }, [template]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailTemplateSchema>({
    resolver: zodResolver(emailTemplateSchema),
    values: template ? { ...template, content: readableContent } : undefined,
  });

  const { mutateAsync: createEmailTemplate, isPending: isCreating } =
    useCreateEmailTemplate();
  const { mutateAsync: updateEmailTemplate, isPending: isUpdating } =
    useUpdateEmailTemplate();

  const onSubmit: SubmitHandler<EmailTemplateSchema> = async (data) => {
    const formattedContent = data.content.replace(/\n/g, "<br/>");
    const finalContent = `<p>${formattedContent}</p>`;

    const response = template?.id
      ? await updateEmailTemplate({
          id: template.id,
          payload: { ...data, content: finalContent },
        })
      : await createEmailTemplate({ ...data, content: finalContent });

    if (response.status === 200 || response.status === 201) {
      navigate({ to: "/prospect-email-templates/" });
    }
  };

  return (
    <form
      className="bg-white w-full max-w-[40rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-8 flex flex-col border-b border-b-gray-300">
        <span>Email Template Details</span>
        <span className="text-xs text-gray-400">
          Templates are used for sending emails to the prospects.
        </span>
      </div>
      <div className="p-8 pb-4">
        <div className="mb-8 grid gap-y-4 gap-x-8">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Template Name
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="name"
                {...register("name")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Subject
            </label>
            <div className="w-full mt-2">
              <input
                type="text"
                id="subject"
                {...register("subject")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.subject && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.subject?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Content
            </label>
            <div className="w-full mt-2">
              <textarea
                id="content"
                rows={5}
                {...register("content")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors.subject && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.subject?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-end gap-4 border-t border-t-gray-300">
        <Button type="button" variant="noBorder">
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? (
            <>
              <Spinner /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EmailTemplateForm;
