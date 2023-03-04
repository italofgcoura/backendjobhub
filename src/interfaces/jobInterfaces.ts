interface IJob {
  candidates: string[];
  companyName?: string | undefined;
  companyId?: string | undefined;
  title?: string | undefined;
  seniority?: string | undefined;
  description?: string;
  wage?: string | undefined;
  contact?: string | undefined;
  startDeadLine?: string | undefined;
}

type IJobs = Array<IJob>

export { IJobs, IJob };
