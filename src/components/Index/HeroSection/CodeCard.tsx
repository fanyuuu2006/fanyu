import { Toast } from "@/components/custom/Toast";
import { CopyOutlined } from "@ant-design/icons";
import { OverrideProps } from "fanyucomponents";

type CodeClassName =
  | "keyword-blue" // const, let, function, if, else class type
  | "keyword-purple" // import, export, from, as ,return
  | "string" // string
  | "number" // number
  | "comment" // comment ex: //, /* */, /** */
  | "type" // type, interface, enum
  | "variable" // variable, function name, class name, method name
  | "constant" // constant, enum value, static property
  | `brackets-${1 | 2 | 3}` // (), [], {}, <>, (), [], {}, <
  | "operator" // +, -, *, /, %, =, ==, ===, !=, !==, <, >, <=, >=
  | "default"; // ., ,, ;, :, ?, !, @, #, $, %, ^, &, *, (, ), [, ], {, }, <, >, /, \, |, \", ', `;

export type CodeItem<T extends React.ElementType = React.ElementType> = {
  tag?: T;
  className?: CodeClassName;
  label: string;
  props?: React.ComponentProps<T>;
};

const codeClassNameMap: Record<
  CodeClassName,
  React.HTMLAttributes<React.ElementType>["className"]
> = {
  "keyword-blue": "text-[#569cd6]",
  "keyword-purple": "text-[#c586c0]",
  string: "text-[#ce9178]",
  number: "text-[#b5cea8]",
  comment: "text-[#6a9955]",
  variable: "text-[#9cdcfe]",
  constant: "text-[#4fc1ff]",
  type: "text-[#4ec9b0]",
  "brackets-1": "text-[#ffd700]",
  "brackets-2": "text-[#da70d6]",
  "brackets-3": "text-[#179fff]",
  operator: "text-[#d4d4d4]",
  default: "text-[#d4d4d4]",
};

export type CodeCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    codeLines: CodeItem[][];
  }
>;

export const CodeCard = ({ codeLines, ...rest }: CodeCardProps) => {
  return (
    <div className="card p-6 overflow-auto" {...rest}>
      <div className="hint flex items-center">
        <span>TypeScript</span>
        <button
          className="btn flex items-center justify-center ml-auto w-6 h-6 rounded-sm"
          onClick={async () => {
            const plainText = codeLines
              .map((line) => line.map((item) => item.label).join(""))
              .join("\n");

            await navigator.clipboard
              .writeText(plainText)
              .then(() => {
                Toast.fire({
                  icon: "success",
                  text: "已複製到剪貼簿",
                });
              })
              .catch((err) => {
                console.error("複製代碼失敗", err);
                Toast.fire({ icon: "error", text: "複製代碼失敗" });
              });
          }}
        >
          <CopyOutlined />
        </button>
      </div>
      <pre className="note flex flex-col">
        {codeLines.map((lineItems, index) => (
          <div key={index} className="flex flex-nowrap gap-2">
            <span className="text-[#888] select-none">{index + 1}</span>
            <code className={`whitespace-pre-wrap`}>
              {lineItems.map((item, itemIndex) => {
                const Tag = item.tag || "span";
                if (!item.label) return null;
                const { className, ...rest } = item.props || {};
                return (
                  <Tag
                    key={itemIndex}
                    className={`${
                      codeClassNameMap[item.className || "default"]
                    } ${className || ""}`}
                    {...rest}
                  >
                    {item.label}
                  </Tag>
                );
              })}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
};
