import Heading from "@/components/Heading";
import PageLayout from "@/components/PageLayout";
import * as z from "zod";

const formSchema = z.object({
  label: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }),
});

const CreateWebinarPage = () => {
  return (
    <div className="bg-slate-100 h-full pt-[107px]">
      <PageLayout>
        <div className="p-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col space-y-4">
            <Heading
              title="Create Webinar"
              description="Create webinar session and invite your attendees"
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CreateWebinarPage;
