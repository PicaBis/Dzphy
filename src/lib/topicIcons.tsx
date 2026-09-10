import {
  Gauge,
  Zap,
  Waves,
  FlaskConical,
  Telescope,
  Atom,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

/**
 * Professional topic icons (lucide) keyed by the icon name stored in
 * data files — replaces the old emoji topic icons everywhere.
 */
export const topicIconMap: Record<string, LucideIcon> = {
  gauge: Gauge,
  zap: Zap,
  waves: Waves,
  flask: FlaskConical,
  telescope: Telescope,
  atom: Atom,
};

export function getTopicIconComponent(icon: string): LucideIcon {
  return topicIconMap[icon] ?? BookOpen;
}
