export type TAlertModeType = "error" | "success" | "warning" | "info";

export type TAlertProps = {
  text: string;
  title: string;
  type: TAlertModeType;
  displayed: boolean;
};
