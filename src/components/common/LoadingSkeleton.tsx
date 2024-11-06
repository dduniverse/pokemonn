import { ImageList, ImageListItem, Skeleton } from "@mui/material";

export function LoadingSkeletonCard({ cols }: { cols: number }) {
  return (
    <ImageList cols={cols} rowHeight="auto" className="overflow-hidden p-4">
      {[...Array(8)].map((_, index) => (
        <ImageListItem key={index}>
          <Skeleton variant="rectangular" height={170} className="rounded-lg mb-4" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function LoadingSkeletonList() {
  return (
    <div className="flex flex-col p-8 gap-8">
      <Skeleton variant="rectangular" className="rounded-lg" height={50} sx={{ marginBottom: 1 }} />
      <Skeleton variant="rectangular" className="rounded-lg" height={135} sx={{ marginBottom: 1 }} />
      <Skeleton variant="rectangular" className="rounded-lg" height={200} sx={{ marginBottom: 1 }} />
    </div>
  );
}
