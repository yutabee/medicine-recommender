// pages/favorites.tsx
import { FavoritesList } from "@/components/FavoritesList";
import { Header } from "@/components/Header";

export default function FavoritesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <Header />
      <FavoritesList />
    </div>
  );
}
