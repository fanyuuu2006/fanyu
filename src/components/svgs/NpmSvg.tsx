const NpmSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={'1em'}
    height={'1em'}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="#CB3837" d="M0 10v10h9v2h7v-2h16V10z" />
    <path
      fill="#fff"
      d="M5.462 12H2v6h3.462v-4.389h1.761V18h1.762v-6zm5.284 0v8h3.523v-2h3.462v-6zm5.224 4.389h-1.701V13.61h1.7zM22.954 12h-3.462v6h3.462v-4.389h1.762V18h1.761v-4.389h1.762V18H30v-6z"
    />
  </svg>
);
export default NpmSvg;
