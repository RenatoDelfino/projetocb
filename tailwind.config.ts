import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "product-detail": "500px 1fr"
      },
      backgroundColor: {
        "delivery": "rgb(249, 252, 255)",
        "input": "rgb(247, 247, 247)",
        "modalOverlay": "rgba(255, 255, 255, .1)"
      },
      textColor: {
        "price": "rgb(145, 145, 145)",
        "productPrice": "rgb(0, 51, 198)"
      },
      borderColor: {
        input: "rgb(145, 145, 145)",
        address: "rgb(231, 231, 231)",
        borderProduct: "rgb(0, 51, 198)"
      },
      fontWeight: {
        "extra-bold": "900"
      }
    },
  },
  plugins: [],
};
export default config;
