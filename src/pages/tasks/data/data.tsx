import { Badge } from "@/components/ui/badge";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];
export const projects = [
  {
    value: "Malam Team",
    label: "Malam Team",
  },
  {
    value: "IBM",
    label: "IBM",
  },
  {
    value: "Amazon",
    label: "Amazon",
  },
  {
    value: "Payoneer",
    label: "Payoneer",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
    badgeType: "badge-error rounded-full px-2 py-1",
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
    badgeType: "badge-info rounded-full px-2 py-1",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
    badgeType: "badge-warning rounded-full px-2 py-1",
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
    badgeType: "badge-success rounded-full px-2 py-1",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
export const owners = [
  {
    label: "first",
    value: "last",
    icon: ArrowDownIcon,
  },
  {
    label: "firsqt",
    value: "lastq",
    icon: ArrowDownIcon,
  },
];
