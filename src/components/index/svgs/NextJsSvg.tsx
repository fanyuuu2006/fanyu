const NextJsSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <mask
      id="next_js_svg__a"
      width={48}
      height={48}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <circle cx={24} cy={24} r={24} fill="#000" />
    </mask>
    <g mask="url(#next_js_svg__a)">
      <circle
        cx={24}
        cy={24}
        r={23.2}
        fill="#000"
        stroke="#fff"
        strokeWidth={1.6}
      />
      <path
        fill="url(#next_js_svg__b)"
        d="M39.869 42.006 18.438 14.4H14.4v19.192h3.23v-15.09L37.333 43.96a24 24 0 0 0 2.536-1.954"
      />
      <path fill="url(#next_js_svg__c)" d="M30.667 14.4h3.2v19.2h-3.2z" />
    </g>
    <defs>
      <linearGradient
        id="next_js_svg__b"
        x1={29.067}
        x2={38.533}
        y1={31.067}
        y2={42.8}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="next_js_svg__c"
        x1={32.267}
        x2={32.213}
        y1={14.4}
        y2={28.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default NextJsSvg;
