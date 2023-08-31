export interface BreadCrumbsType {
  text: string;
  href?: string;
  onClick?: () => void;
}
export interface Usertype {
  email: string;
  name: string;
  uid: string;
  label?: string;
}

export interface FieldErrorType {
  show: boolean;
  message: Array<string>;
}

export interface ToastType {
  id: string;
  title: string;
  color: "success" | "primary" | "warning" | "danger" | undefined;
}
export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

export interface MeetingType {
  docId?: string;
  createdBy: string;
  invitedUsers: Array<string>;
  maxUsers: number;
  meetingDate: string;
  meetingId: string;
  meetingName: string;
  meetingType: MeetingJoinType;
  status: boolean;
}
