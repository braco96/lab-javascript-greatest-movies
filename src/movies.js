// Iteration 1: All directors
function getAllDirectors(moviesArray) {
    // nuevo array con los directores (no muta)
    return moviesArray.map(m => m.director);
  }
  
  // BONUS iter 1 (opcional): sin duplicados
  function getAllDirectorsUnique(moviesArray) {
    return [...new Set(getAllDirectors(moviesArray))];
  }
  
  // Iteration 2: Spielberg + Drama
  function howManyMovies(moviesArray) {
    if (!Array.isArray(moviesArray) || moviesArray.length === 0) return 0;
    return moviesArray.filter(
      m => m.director === 'Steven Spielberg' && Array.isArray(m.genre) && m.genre.includes('Drama')
    ).length;
  }
  
  // Iteration 3: All scores average - 2 decimales
  function scoresAverage(moviesArray) {
    if (!Array.isArray(moviesArray) || moviesArray.length === 0) return 0;
  
    const total = moviesArray.reduce((acc, m) => {
      // si no hay score, cuenta como 0 pero mantiene el divisor = nº pelis (así lo pide el lab)
      const s = typeof m.score === 'number' ? m.score : 0;
      return acc + s;
    }, 0);
  
    return Number((total / moviesArray.length).toFixed(2));
  }
  
  // Iteration 4: Media de Drama
  function dramaMoviesScore(moviesArray) {
    const dramas = moviesArray.filter(m => Array.isArray(m.genre) && m.genre.includes('Drama'));
    if (dramas.length === 0) return 0;
    return scoresAverage(dramas);
  }
  
  // Iteration 5: Order by year (y por título en empate)
  function orderByYear(moviesArray) {
    // copia para no mutar
    const copy = moviesArray.map(m => ({ ...m }));
    return copy.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }
  
  // Iteration 6: Order alphabetically y top-20 títulos
  function orderAlphabetically(moviesArray) {
    const titles = moviesArray.map(m => m.title);
    titles.sort((a, b) => a.localeCompare(b));
    return titles.slice(0, 20);
  }
  
  // BONUS 7: Turn duration to minutes (robusto a "2h 3min", "2h", "36min", "2h3min")
  function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(m => {
      const movieCopy = { ...m };
      const raw = String(movieCopy.duration || '').trim();
  
      let hours = 0;
      let mins = 0;
  
      // extrae "Xh" y "Ymin" aunque no haya espacios
      const hMatch = raw.match(/(\d+)\s*h/);
      const mMatch = raw.match(/(\d+)\s*min/);
  
      if (hMatch) hours = parseInt(hMatch[1], 10);
      if (mMatch) mins = parseInt(mMatch[1], 10);
  
      movieCopy.duration = hours * 60 + mins;
      return movieCopy;
    });
  }
  
  // BONUS 8: Best yearly score average (empate → año más antiguo)
  function bestYearAvg(moviesArray) {
    if (!Array.isArray(moviesArray) || moviesArray.length === 0) return null;
  
    // Agrupamos las pelis por año
    const byYear = moviesArray.reduce((acc, m) => {
      (acc[m.year] ||= []).push(m);
      return acc;
    }, {});
  
    let bestYear = null;
    let bestAvg = -Infinity;
  
    for (const yearStr of Object.keys(byYear)) {
      const year = Number(yearStr);
      const avg = scoresAverage(byYear[year]); // usa la misma lógica de medias
  
      if (avg > bestAvg || (avg === bestAvg && (bestYear === null || year < bestYear))) {
        bestAvg = avg;
        bestYear = year;
      }
    }
  
    // Si la media es un número entero, muéstralo sin decimales.
    const avgStr = Number.isInteger(bestAvg) ? bestAvg : bestAvg.toFixed(1);
  
    return `The best year was ${bestYear} with an average score of ${avgStr}`;
  }
  
  
  // Export (para tests)
  if (typeof module !== 'undefined') {
    module.exports = {
      getAllDirectors,
      howManyMovies,
      scoresAverage,
      dramaMoviesScore,
      orderByYear,
      orderAlphabetically,
      turnHoursToMinutes,
      bestYearAvg,
      // opcional
      getAllDirectorsUnique
    };
  }
  