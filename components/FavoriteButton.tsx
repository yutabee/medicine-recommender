import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
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
      return !isFavorite;
    } else {
      console.log("Failed to toggle favorite");
    }
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
  }
  return isFavorite;
}

interface FavoriteButtonProps {
  userId: string;
  productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  userId,
  productId,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

  console.log(userId, productId);
  useEffect(() => {
    axios
      .get(`/api/favorites/${userId}/${productId}`)
      .then((response) => {
        console.log("Favorite data:", response.data);
        setIsFavorite(response.data.isFavorite);
      })
      .catch((error) => {
        console.error(
          "Failed to get favorite state:",
          error.response ? error.response.data : error.message
        );
      });
  }, [userId, productId]);

  return (
    <>
      {isFavorite !== null && (
        <button
          onClick={async () => {
            const newState = await toggleFavorite(
              userId,
              productId,
              isFavorite
            );
            setIsFavorite(newState);
          }}
          className={`p-1 rounded-full focus:outline-none transition-colors duration-200 ${
            isFavorite ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      )}
    </>
  );
};
