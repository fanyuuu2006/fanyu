const TocSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M8 5h13"></path>
    <path d="M13 12h8"></path>
    <path d="M13 19h8"></path>
    <path d="M3 10a2 2 0 0 0 2 2h3"></path>
    <path d="M3 5v12a2 2 0 0 0 2 2h3"></path>
  </svg>
);
export default TocSvg;
