export interface SubmissionResponse {
  stdout: string;
  time: string;
  description: string;
  compileOutput: string | null;
}

export type SubmissionOutput = string | undefined;
