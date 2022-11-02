export const loader = () => {
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://eucrona.com</loc>              
            </url>
             <url>
                <loc>https://eucrona.com/Solutions</loc>
            </url>
            <url>
                <loc>https://eucrona.com/Infrastructure</loc>
            </url>
             <url>
                <loc>https://eucrona.com/Resources</loc>
            </url>
             <url>
                <loc>https://eucrona.com/Contacts</loc>
            </url>          
        </urlset>
        `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
