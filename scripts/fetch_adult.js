const fs = require('fs');

const movies = [
  "Love (2015)", "Nymphomaniac: Vol. I (2013)", "Nymphomaniac: Vol. II (2013)", 
  "Fifty Shades of Grey (2015)", "Fifty Shades Darker (2017)", "Fifty Shades Freed (2018)", 
  "365 Days (2020)", "365 Days: This Day (2022)", "The Next 365 Days (2022)", 
  "Basic Instinct (1992)", "Basic Instinct 2 (2006)", "Eyes Wide Shut (1999)", 
  "The Dreamers (2003)", "Blue Is the Warmest Colour (2013)", "The Handmaiden (2016)", 
  "Secretary (2002)", "Unfaithful (2002)", "Original Sin (2001)", "Wild Things (1998)", 
  "Bound (1996)", "Body Heat (1981)", "Body of Evidence (1993)", "Fatal Attraction (1987)", 
  "Indecent Proposal (1993)", "Disclosure (1994)", "Sliver (1993)", "Chloe (2009)", 
  "Below Her Mouth (2016)", "Room in Rome (2010)", "Newness (2017)", "Addicted (2014)", 
  "Deep Water (2022)", "Fair Play (2023)", "Babygirl (2024)", "Sanctuary (2022)", 
  "The Voyeurs (2021)", "Burning Betrayal (2023)", "Lady Chatterley’s Lover (2022)", 
  "Through My Window (2022)", "Amar (2017)", "Duck Butter (2018)", "Lust, Caution (2007)", 
  "In the Realm of the Senses (1976)", "Romance (1999)", "Intimacy (2001)", "9 Songs (2004)", 
  "Shortbus (2006)", "Lie with Me (2005)", "Sex and Lucia (2001)", "Y Tu Mamá También (2001)", 
  "The Lover (1992)", "Henry & June (1990)", "Betty Blue (1986)", "Emmanuelle (1974)", 
  "The Story of O (1975)", "Last Tango in Paris (1972)", "Belle de Jour (1967)", 
  "The Unbearable Lightness of Being (1988)", "Bitter Moon (1992)", "Damage (1992)", 
  "The Piano Teacher (2001)", "Young & Beautiful (2013)", "Swimming Pool (2003)", 
  "Stranger by the Lake (2013)", "Love and Other Drugs (2010)", "Shame (2011)", 
  "Professor Marston and the Wonder Women (2017)", "A Bigger Splash (2015)", "The Duke of Burgundy (2014)", 
  "Kissed (1996)", "Crash (1996)", "Ken Park (2002)", "The Brown Bunny (2003)", 
  "Antichrist (2009)", "The Untamed (2016)", "Q—Desire (2011)", "Anatomy of Hell (2004)", 
  "Elles (2011)", "Diary of a Nymphomaniac (2008)", "The Ages of Lulu (1990)", "Monamour (2006)", 
  "All Ladies Do It (1992)", "Cheeky! (2000)", "The Key (1983)", "Paprika (1991)", 
  "Black Angel (2002)", "The Voyeur (1994)", "The Last Mistress (2007)", "Nathalie… (2003)", 
  "Love Actually… Sucks! (2011)", "A Frozen Flower (2008)", "Obsessed (2014)", "The Concubine (2012)", 
  "Portrait of a Beauty (2008)", "The Treacherous (2015)", "Scarlet Innocence (2014)", 
  "The Housemaid (2010)", "High Society (2018)", "Serve the People (2022)", "Delicious (2021)"
];

const API_KEY = '5d067b9d81cc3970f1365e1e9862ce6b';

async function fetchMovies() {
  const results = [];
  
  for (const movieStr of movies) {
    const match = movieStr.match(/(.+?)\s*\((\d{4})\)/);
    let title = movieStr;
    let year = '';
    if (match) {
      title = match[1].trim();
      year = match[2];
    }
    
    console.log(`Fetching: ${title} (${year})`);
    
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&include_adult=true`;
    if (year) url += `&primary_release_year=${year}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        let bestMatch = data.results[0];
        bestMatch.media_type = 'movie'; // add media type
        results.push(bestMatch);
      } else {
        console.log(`NOT FOUND: ${title}`);
      }
    } catch (e) {
      console.error(`Error fetching ${title}: ${e.message}`);
    }
    
    await new Promise(r => setTimeout(r, 100));
  }
  
  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
  }
  
  fs.writeFileSync('src/data/adult_movies.json', JSON.stringify(results, null, 2));
  console.log(`Done! Saved ${results.length} movies.`);
}

fetchMovies();
