import { Code2, Server, Database, Workflow, Wrench } from "lucide-react";
const icons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  automation: Workflow,
  tools: Wrench,
};
export function SkillIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon size={20} aria-hidden="true" />;
}
