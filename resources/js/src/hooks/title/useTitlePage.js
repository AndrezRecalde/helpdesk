import { useDocumentTitle } from "@mantine/hooks"

export const useTitlePage = (title = "Helpdesk") => {
  return useDocumentTitle(title);
}
