export enum EnumStatus {
  "todo" = "todo",
  "in-progress" = "in-progress",
  "produced" = "produced",
  "done" = "done",
}

export interface IBasedField {
  $createdAt: string;
  $id: string;
}

export interface IComment extends IBasedField {
  text: string;
}

export interface IDeal {
  name: string;
  status: EnumStatus;
  description: string;
  comments: IComment[];
}

export interface IComumn {
  id: EnumStatus;
  name: string;
  items: IDeal;
}
