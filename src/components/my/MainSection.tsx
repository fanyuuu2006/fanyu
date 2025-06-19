"use client";
import { useMemo } from "react";
import { CodeCard } from "../custom/CodeCard";
import { TimerCard } from "./TimerCard";
import c063 from "c063";

export const MainSection = () => {
  const codeLines = useMemo(() => {
    return [
      [c063.string('"use client"'), c063.default(";")],
      [
        c063.keyword2("import "),
        c063.brackets1("{ "),
        c063.variable("OverrideProps "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"fanyucomponents"'),
        c063.default(";"),
      ],
      [
        c063.keyword2("import "),
        c063.brackets1("{ "),
        c063.variable("LanguageContent"),
        c063.default(", "),
        c063.variable("LanguageOption "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"@/types/language"'),
        c063.default(";"),
      ],
      [
        c063.keyword2("import "),
        c063.brackets1("{ "),
        c063.variable("useLanguage "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"@/context/LanguageContext"'),
        c063.default(";"),
      ],
      [
        c063.keyword2("import "),
        c063.variable("React"),
        c063.default(", "),
        c063.brackets1("{ "),
        c063.variable("useState"),
        c063.default(", "),
        c063.variable("useEffect"),
        c063.default(", "),
        c063.variable("useMemo "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"react"'),
        c063.default(";"),
      ],
      [
        c063.keyword2("import "),
        c063.brackets1("{ "),
        c063.variable("profile "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"@/libs/profile"'),
        c063.default(";"),
      ],
      [
        c063.keyword2("import "),
        c063.brackets1("{ "),
        c063.variable("LoadingOutlined "),
        c063.brackets1("} "),
        c063.keyword2("from "),
        c063.string('"@ant-design/icons"'),
        c063.default(";"),
      ],
      [],
      [
        c063.keyword2("export "),
        c063.keyword1("const "),
        c063.function("TimerCard "),
        c063.operator("= "),
        c063.brackets1("() "),
        c063.keyword1("=> "),
        c063.brackets1("{"),
      ],
      [
        c063.keyword1("  const "),
        c063.constant("nextBirthday "),
        c063.operator("= "),
        c063.function("useMemo"),
        c063.brackets2("("),
        c063.brackets3("() "),
        c063.keyword1("=> "),
        c063.brackets3("{"),
      ],
      [c063.keyword2("    return "), c063.brackets1("{}"), c063.default(";")],
      [
        c063.brackets3("  }, "),
        c063.brackets3("[]"),
        c063.brackets2(")"),
        c063.default(";"),
      ],
      [c063.keyword2("  return "), c063.brackets2("(")],
      [c063.brackets2("  );")],
      [c063.brackets1("};")],
    ];
  }, []);
  return (
    <section id="hero">
      <div className="container flex flex-col items-center justify-center min-h-162">
        <TimerCard />
        <CodeCard lang="ts" codeLines={codeLines} />
      </div>
    </section>
  );
};
