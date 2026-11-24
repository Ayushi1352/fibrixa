"use client";

import type { EnquiryFormData, FormField } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonArrow, buttonClass } from "@/components/ui/buttonStyles";

/** White fields with a light grey border and rounded corners, like the design */
const base =
  "w-full appearance-none rounded-[0.625rem] border-2 border-[var(--color-border-field)] bg-[var(--color-white)] px-4 font-sans text-[0.95rem] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-maroon)] lg:border-[0.125rem] lg:px-[1.625rem] lg:text-[1.5625rem]";
const field = `${base} h-12 lg:h-[4rem]`;

const Field = ({ name, type = "text", field: data, required = false, autoComplete }: { name: string; type?: string; field: FormField; required?: boolean; autoComplete?: string }) => (
  <input name={name} type={type} required={required} placeholder={data.placeholder} aria-label={data.placeholder} autoComplete={autoComplete} className={field} />
);

/** The "Send Us a Message" form; dummy submit with a thank-you message in place of the button */
export const EnquiryForm = ({ data }: { data: EnquiryFormData }) => {
  const submit = useDummySubmit();
  const { fields } = data;

  // remounting the form (via key) after each send clears every field
  return (
    <form
      key={submit.round}
      onSubmit={submit.onSubmit}
      onInput={submit.onInput}
      aria-busy={submit.sending}
      className="mt-6 grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:mt-[2.05rem] lg:gap-x-[1.75rem] lg:gap-y-[1.625rem]"
    >
      <Field name="name" field={fields.name} required autoComplete="name" />
      <Field name="email" type="email" field={fields.email} required autoComplete="email" />
      <Field name="phone" type="tel" field={fields.phone} autoComplete="tel" />
      <Field name="company" field={fields.company} autoComplete="organization" />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={fields.message.placeholder}
        aria-label={fields.message.placeholder}
        className={`${base} h-36 resize-y py-3 sm:col-span-2 lg:mt-[0.125rem] lg:h-[11.625rem] lg:pb-[1.1rem] lg:pt-[0.72rem]`}
      />
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="sm:col-span-2 lg:mt-[0.75rem]"
        />
      ) : (
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonClass} mt-2 h-12 w-full gap-3 rounded-lg font-sans text-base font-semibold sm:w-auto sm:justify-self-start sm:px-7 lg:mt-[0.75rem] lg:h-[4.81rem] lg:w-[19.69rem] lg:gap-[1.6rem] lg:rounded-[0.625rem] lg:px-0 lg:text-[1.6rem]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5 lg:size-[1.8rem]" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="TbArrowRight" className={`${buttonArrow} size-5 lg:size-[2.1rem]`} strokeWidth={2} />
            </>
          )}
        </button>
      )}
    </form>
  );
};
