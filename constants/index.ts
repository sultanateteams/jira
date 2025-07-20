import type { TabsItem } from "@nuxt/ui";
import { EnumStatus } from "~/types";

export const DB_ID = "jira-db";
export const COLLECTION_DEALS = "687a67410036b393398d"
export const COLLECTION_COMMMENTS = "comments"

export const tabs: TabsItem[] = [
  {
    label: "Plan",
    description:
      "Break the big ideas down into manageable chunks across teams with user stories, issues and tasks.",
    image: "/Board.png",
    credentails: {
      text: "Work becomes a lot more visible when it's all in one place. It makes collabration a whole lot easier.",
      username: "Vali Ali",
      company: "ABS LLC",
    },
  },
  {
    label: "Truck",
    description:
      "Prioritize and discuss your team's work in  context while with complate visibility at every level.",
    image: "/Timeline.png",
    credentails: {
      text: "The place of  delivery from idea to reality has exploded",
      username: "Sayfiddin Qutuz",
      company: "Mamluk Sultanate",
    },
  },
  {
    label: "Release",
    description:
      "Ship faster, with confidence knowing the information you have is always up-to-date",
    image: "/Releases.png",
    credentails: {
      text: "Less friction in the development process mean better result and faster time to market",
      username: "Jaloliddin Mangburni",
      company: "Khwarezmshahs Empire",
    },
  },
];

export const templates = [
  {
    name: "Scrum",
    image: "/scrum.svg",
  },
  {
    name: "Kanban",
    image: "/kanban.svg",
  },
  {
    name: "Bug tracking",
    image: "/bug.svg",
  },
  {
    name: "DevOps",
    image: "/devops.svg",
  },
];

export const sidebarItems = [
  {
    name: "Dashboard",
    url: "/documents",
    icon: "radix-icons:dashboard",
  },
  {
    name: "To do",
    url: "/documents/to-do",
    icon: "ri:todo-fill",
  },
  {
    name: "In progress",
    url: "/documents/in-progress",
    icon: "game-icons:progression",
  },
  {
    name: "Produced",
    url: "/documents/produced",
    icon: "eos-icons:product-subscriptions",
  },
  {
    name: "Done",
    url: "/documents/done",
    icon: "ic:baseline-cloud-done",
  },
];

export const status = [
  {
    id: EnumStatus.todo,
    name: "To do",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "In progress",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Done",
    items: [],
  },
];
