import { CreateCategory } from "@/features/category/components/create-category";

export default function CategoriesPage() {
  return (
    <>
      <div className="absolute right-6 bottom-6">
        <CreateCategory />
      </div>
    </>
  );
}
