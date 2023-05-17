import axios from "axios";
import { FC, useEffect, useState } from "react";

async function toggleFavorite(
  userId: string,
  productId: number,
  isFavorite: boolean
) {
  try {
    const url = `/api/favorites/${isFavorite ? "delete" : "add"}`;
    const response = await axios.post(url, {
      userId,
      productId,
    });

    if (response.status === 200) {
      console.log(isFavorite ? "Removed from favorites" : "Added to favorites");
    } else {
      console.log("Failed to toggle favorite");
    }
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
  }
}

interface FavoriteButtonProps {
  userId: string;
  productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  userId,
  productId,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/favorites/${userId}/${productId}`)
      .then((response) => setIsFavorite(response.data.isFavorite))
      .catch((error) => console.error("Failed to get favorite state:", error));
  }, [userId, productId]);

  return (
    <button
      onClick={() => {
        toggleFavorite(userId, productId, isFavorite);
        setIsFavorite(!isFavorite);
      }}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
};
