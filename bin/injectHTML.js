

function htmlWithMetadata (metadata) {
	return (`
<title>${metadata.title}</title>
<meta
	name="description"
	content="${metadata.description}"
/>

<!-- {/* open graph */} -->
<meta name="og:title" content="${metadata.title}" />
<meta name="og:type" content="website" />
<meta name="og:url" content="http://www.funnyscar.com/" />
<meta name="og:image" content="${metadata.image}" />
<meta name="og:site_name" content="funnyscar" />
<meta
	name="og:description"
	content="${metadata.description}"
/>


<!-- twitter -->
<meta property="twitter:url" content="https://funnyscar.com/" />
<meta property="twitter:title" content="${metadata.title}" />
<meta property="twitter:card" content="summary_large_image" />
<meta
	property="twitter:description"
	content="${metadata.description}"
/>
<meta
	property="twitter:image"
	content="${metadata.image}"
/>

<!-- {/* google */} -->
<meta
	name="news_keywords"
	content="math, mathematics, physics, computer science, graphics, visual math, Curtis Hu, curtisjhu, funnyscar, ${metadata.keywords}"
/>


`)};

module.exports = htmlWithMetadata;