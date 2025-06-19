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
        c063.keyword1("type "),
        c063.type("TimerContent "),
        c063.operator("= "),
        c063.type("Record"),
        c063.brackets1("<"),
      ],
      [
        c063.string('  "birthdayTimer" '),
        c063.operator("| "),
        c063.string('"days" '),
        c063.operator("| "),
        c063.string('"hours" '),
        c063.operator("| "),
        c063.string('"minutes" '),
        c063.operator("| "),
        c063.string('"seconds"'),
        c063.operator(","),
      ],
      [c063.type("  string")],
      [c063.brackets1(">"), c063.default(";")],
      [],
      [
        c063.keyword2("export "),
        c063.keyword1("const "),
        c063.function("getTimerContent "),
        c063.operator("= "),
        c063.brackets1("("),
        c063.variable("language"),
        c063.default(": "),
        c063.type("LanguageOption"),
        c063.brackets1(") "),
        c063.default(": "),
        c063.type("TimerContent "),
        c063.keyword1("=> "),
      ],
      [c063.brackets1("  ("), c063.brackets2("(")],
      [c063.brackets3("    {")],
      [
        c063.variable("      chinese"),
        c063.operator(": "),
        c063.brackets3("{"),
      ],
      [
        c063.comment("/**...待完成 */")
      ]
    ];
  }, []);
  return (
    <section id="hero">
      <div className="container flex flex-col items-center justify-center min-h-162">
        <TimerCard />
        <CodeCard className="hint" lang="ts" codeLines={codeLines} />
      </div>
    </section>
  );
};
