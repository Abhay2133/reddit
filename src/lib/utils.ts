export function generateRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

export function generateRandomLinearGradient(): string {
  // Helper function to generate a random hex color
  const generateRandomHexColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  // Generate random degree for the gradient direction
  const randomDegree = Math.floor(Math.random() * 360);

  // Generate two random colors
  const color1 = generateRandomHexColor();
  const color2 = generateRandomHexColor();

  // Return the linear gradient CSS value
  return `linear-gradient(${randomDegree}deg, ${color1}, ${color2})`;
}

// Define a fetcher function
export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });

export const toSocialNumber = (n: number) => {
  if (n > 1000) return n.toString().slice(0, -3) + "K";
  return n;
};
