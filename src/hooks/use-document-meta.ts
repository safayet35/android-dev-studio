import { useEffect } from "react";

function upsertMeta(selector: string, create: () => HTMLMetaElement) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  let created = false;
  if (!el) {
    el = create();
    document.head.appendChild(el);
    created = true;
  }
  return { el, created };
}

export function useDocumentMeta({
  title,
  description,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const desc = upsertMeta('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.name = "description";
      return m;
    });
    const prevDesc = desc.el.content;
    desc.el.content = description;

    const ogt = upsertMeta('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    const prevOgt = ogt.el.content;
    ogt.el.content = ogTitle;

    const ogd = upsertMeta('meta[property="og:description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    });
    const prevOgd = ogd.el.content;
    ogd.el.content = ogDescription;

    return () => {
      document.title = prevTitle;
      desc.el.content = prevDesc;
      ogt.el.content = prevOgt;
      ogd.el.content = prevOgd;
      if (desc.created) desc.el.remove();
      if (ogt.created) ogt.el.remove();
      if (ogd.created) ogd.el.remove();
    };
  }, [title, description, ogTitle, ogDescription]);
}
