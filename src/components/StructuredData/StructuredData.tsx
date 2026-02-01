interface StructuredDataProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

/**
 * Renders Schema.org structured data as a JSON-LD script tag
 * @param data - Schema.org data object (can be any valid JSON-serializable structure)
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
