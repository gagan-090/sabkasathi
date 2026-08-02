/*
  Structured data, rendered into the server HTML.

  Deliberately a native <script> and not `next/script`. next/script is a
  loader for executable JavaScript: with its default `afterInteractive`
  strategy the tag is injected by the client after hydration, so the JSON-LD
  never appears in the HTML the server sends. Google's renderer would still
  find it eventually, but the answer engines and preview crawlers that read
  raw HTML — the entire point of marking these pages up — would not.

  Next's own guidance says exactly this (node_modules/next/dist/docs/01-app/
  02-guides/json-ld.md): "Since JSON-LD is structured data, not executable
  code, a native <script> tag is the right choice here."

  The `<` → < replacement is the documented XSS guard: JSON.stringify
  does not escape HTML, so a stray "</script>" inside any string field would
  otherwise close this tag and let the rest of the payload run as markup.
  Page copy is authored in-repo today, but this data also carries city and
  service names that a future admin panel could make user-editable.
*/
export function JsonLd({ schemas }: { schemas: Record<string, unknown>[] }) {
  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
