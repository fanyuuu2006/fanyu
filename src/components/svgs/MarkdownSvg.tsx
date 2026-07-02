const MarkdownSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={'1em'}
    height={'1em'}
    viewBox="0 0 208 128"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={10}
      d="M15 5h178c5.523 0 10 4.477 10 10v98c0 5.523-4.477 10-10 10H15c-5.523 0-10-4.477-10-10V15C5 9.477 9.477 5 15 5z"
    />
    <path
      fill="currentColor"
      d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0-30-33h20V30h20v35h20z"
    />
  </svg>
);
export default MarkdownSvg;
