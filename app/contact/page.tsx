import ContactForm from "./contact-form";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col gap-8 max-w-2xl w-full mx-auto">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="font-heading font-bold text-4xl leading-tight inline-flex items-center flex-wrap gap-x-4">
          Contact / Feedback
        </h1>
        <p className="text-lg text-muted-foreground">
          Please send me your valuable feedback and suggestions to improve this
          application.
        </p>
      </div>
      <div>
        <ContactForm />
      </div>
    </div>
  );
}
