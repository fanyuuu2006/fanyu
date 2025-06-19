"use client";
import { CodeCard } from "../custom/CodeCard";
import { TimerCard } from "./TimerCard";

export const MainSection = () => {
  // const codeLines = useMemo(() => {
  //   return [
  //     [c063.string('"use client"'), c063.default(";")],
  //     [
  //       c063.keyword2("import "),
  //       c063.brackets1("{ "),
  //       c063.variable("CodeCard "),
  //       c063.brackets1("} "),
  //       c063.keyword2("from "),
  //       c063.string('"../custom/CodeCard"'),
  //       c063.default(";"),
  //     ],
  //     [
  //       c063.keyword2("import "),
  //       c063.brackets1("{ "),
  //       c063.variable("TimerCard "),
  //       c063.brackets1("} "),
  //       c063.keyword2("from "),
  //       c063.string('"./TimerCard"'),
  //       c063.default(";"),
  //     ],
  //     [
  //       c063.keyword2("import "),
  //       c063.variable("c063 "),
  //       c063.keyword2("from "),
  //       c063.string('"c063"'),
  //       c063.default(";"),
  //     ],
  //     [],
  //     [
  //       c063.keyword2("export "),
  //       c063.keyword1("const "),
  //       c063.function("MainSection "),
  //       c063.operator("= "),
  //       c063.brackets1("() "),
  //       c063.keyword1("=> "),
  //       c063.brackets1("{"),
  //     ],
  //     [
  //       c063.keyword1("  const "),
  //       c063.constant("codeLines "),
  //       c063.operator("= "),
  //       c063.function("useMemo"),
  //       c063.brackets2("("),
  //       c063.brackets3("() "),
  //       c063.keyword1("=> "),
  //       c063.brackets3("{"),
  //     ],
  //     [c063.keyword2("    return "), c063.brackets1("[]"), c063.default(";")],
  //     [
  //       c063.brackets3("  }, "),
  //       c063.brackets3("[]"),
  //       c063.brackets2(")"),
  //       c063.default(";"),
  //     ],
  //     [c063.keyword2("  return "), c063.brackets2("(")],
  //     [c063.brackets2("  );")],
  //     [c063.brackets1("};")],
  //   ];
  // }, []);
  return (
    <section id="hero">
      <div className="container flex flex-col items-center justify-center min-h-162">
        <TimerCard />
        {/* <CodeCard lang="ts" codeLines={codeLines} /> */}
      </div>
    </section>
  );
};
