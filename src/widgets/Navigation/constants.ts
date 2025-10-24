import { ROUTES } from "@/shared/api/routes";
import "./index.css";

export const NAV_SECTIONS = [
  {
    path: ROUTES.CONTACTS,
    label: "Карта",
    anchor: "#map-container",
  },
  {
    path: ROUTES.CONTACTS,
    label: "Режим работы",
    anchor: "#work_hours",
  },
    {
    path: ROUTES.DELIVERY,
    label: "Бесплатная доставка",
    anchor: "#free",
  },
] as const;
