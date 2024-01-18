import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, BriefcaseIcon, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Job;
}

const JobPage = ({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobPageProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="gap3 flex items-center">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <BriefcaseIcon className="shrink-0" size={16} />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="shrink-0" size={16} />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 className="shrink-0" size={16} />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote className="shrink-0" size={16} />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
};
export default JobPage;
