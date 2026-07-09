"use client";

// Downloads the résumé with a filename stamped with the current date:
//   ayush resume (DD-MM-YYYY).pdf
export default function ResumeButton() {
  const download = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    const filename = `ayush resume (${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()}).pdf`;
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-[14px] text-ink transition-colors hover:border-accent/50 hover:text-accent"
    >
      Download resume ↓
    </button>
  );
}
