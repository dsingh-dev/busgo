export default function BlanketIcon({
    className = "h-6 w-6",
  }: {
    className?: string;
  }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Folded blanket body */}
        <path d="M4 7.5C4 6.67 4.67 6 5.5 6h9A1.5 1.5 0 0 1 16 7.5V18H5.5A1.5 1.5 0 0 1 4 16.5v-9Z" />
  
        {/* Blanket fold */}
        <path d="M16 9h2.5A1.5 1.5 0 0 1 20 10.5v7A1.5 1.5 0 0 1 18.5 19H16" />
  
        {/* Soft fabric lines */}
        <path d="M7 10h6" />
        <path d="M7 13h6" />
        <path d="M7 16h4" />
      </svg>
    );
  }