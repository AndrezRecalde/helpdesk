import { useDocumentTitle } from "@mantine/hooks"

export const useTitle = (title = "Helpdesk") => {
  return useDocumentTitle(title);
}
