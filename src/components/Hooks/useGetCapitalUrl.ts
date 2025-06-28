import { useEffect, useState } from "react";

export default function useGetCapitalUrl(capital: string) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!capital) return;
    setImageUrl(undefined);

    const fetchImage = async () => {
      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(capital)}`);
        const data = await res.json();

        if (data.originalimage?.source) {
          setImageUrl(data.originalimage.source);
        } else {
          setImageUrl(undefined);
        }
      } catch (err) {
        console.error("Error fetching capital image", err);
        setImageUrl(undefined);
      }
    };

    fetchImage();
  }, [capital]);

  return imageUrl;
}

// https://en.wikipedia.org/api/rest_v1/page/summary/Brasília