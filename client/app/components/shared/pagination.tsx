import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

interface PaginationProps {
  origin_page: string;
  pages_count?: number;
}

export default function BasicPagination({
  origin_page,
  pages_count = 0,
}: PaginationProps) {
  const router = useRouter();

  const navigate = (page: number) =>
    router.replace(`${origin_page}?page=${page}`);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pages_count}
        style={{
          color: "white",
        }}
        color="secondary"
        onChange={(_, value) => navigate(value)}
      />
    </Stack>
  );
}
